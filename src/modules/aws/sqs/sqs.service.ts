import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SendMessageCommand,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';
import { DiscoveryService } from '@nestjs-plus/discovery';
import { MessageHandler, QueueName, SqsMessageHandlerMeta } from './sqs.types';
import { SQS_MESSAGE_HANDLER } from './sqs.constants';

@Injectable()
export class SqsService {
  private readonly client: SQSClient;
  private readonly logger = new Logger(SqsService.name);
  public readonly messageHandlers = new Map<QueueName, MessageHandler>();

  constructor(
    private readonly config: ConfigService,
    private readonly discover: DiscoveryService,
  ) {
    const region = config.get('aws.region');

    const clientConfig: SQSClientConfig = { region };
    // set endpoint if ElasticMQ endpoint provided (offline mode)
    if (this.isLocalQueue()) {
      clientConfig.endpoint = config.get('aws.sqs.elasticMQEndpoint');
      this.logger.debug(`ElasticMQ endpoint ${clientConfig.endpoint}`);
    }

    this.client = new SQSClient(clientConfig);
    this.logger.log('SQS service initialized');
  }

  async onModuleInit() {
    const messageHandlerMetaList =
      await this.discover.providerMethodsWithMetaAtKey<SqsMessageHandlerMeta>(
        SQS_MESSAGE_HANDLER,
      );

    for (const { meta, discoveredMethod } of messageHandlerMetaList) {
      const queueName = meta.queueName;
      if (this.messageHandlers.has(queueName)) {
        throw new Error(`Handler already exists: ${queueName}`);
      }

      const handler = discoveredMethod.handler.bind(
        discoveredMethod.parentClass.instance,
      );

      this.messageHandlers.set(queueName, handler);
      this.logger.log(`SQS message handler registered: ${queueName}`);
    }
  }

  public isLocalQueue() {
    return this.config.get<boolean>('isOffline');
  }

  public getMessageHandlers() {}

  public getQueueUrl(queueName: string): string {
    if (this.isLocalQueue()) {
      const endpoint = this.config.get('aws.sqs.elasticMQEndpoint');
      return `${endpoint}/queue/${queueName}`;
    } else {
      const region = this.config.get('aws.region');
      const accountId = this.config.get('aws.accountId');
      return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
    }
  }

  public async send(queueName: string, input: SendMessageInput): Promise<void> {
    const { body, groupId, deduplicationId, delaySeconds, messageAttributes } =
      input;
    const command = new SendMessageCommand({
      QueueUrl: this.getQueueUrl(queueName),
      MessageGroupId: groupId,
      DelaySeconds: delaySeconds,
      MessageDeduplicationId: deduplicationId,
      MessageSystemAttributes: messageAttributes,
      MessageBody: body,
      MessageAttributes: messageAttributes,
    });
    await this.client.send(command);
  }

  public async purgeQueue(queueName: string): Promise<void> {
    return;
  }
}
