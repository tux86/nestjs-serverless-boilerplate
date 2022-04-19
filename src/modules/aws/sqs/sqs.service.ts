import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SendMessageCommand,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';

@Injectable()
export class SqsService {
  private readonly client: SQSClient;
  private readonly logger = new Logger(SqsService.name);

  constructor(private config: ConfigService) {
    const region = config.get('aws.region');

    const clientConfig: SQSClientConfig = { region };
    // set endpoint if ElasticMQ endpoint provided (offline mode)
    if (this.isLocalQueue()) {
      clientConfig.endpoint = config.get('aws.sqs.elasticMQEndpoint');
      this.logger.debug(`ElasticMQ endpoint ${clientConfig.endpoint}`);
    }

    this.client = new SQSClient(clientConfig);
    this.logger.debug('sqs service initialized');
  }

  public isLocalQueue() {
    return this.config.get<boolean>('isOffline');
  }

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
