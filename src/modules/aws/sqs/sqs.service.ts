import { Injectable, Logger } from '@nestjs/common';
import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';
import { DiscoveryService } from '@nestjs-plus/discovery';
import { MessageHandler, QueueName, SqsMessageHandlerMeta } from './sqs.types';
import { SQS_MESSAGE_HANDLER } from './sqs.constants';
import { SQSProvider } from './sqs.provider';

@Injectable()
export class SqsService {
  public readonly messageHandlers = new Map<QueueName, MessageHandler>();
  private readonly logger = new Logger(SqsService.name);

  constructor(
    private readonly provider: SQSProvider,
    private readonly discover: DiscoveryService,
  ) {
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

  public async send(queueName: string, input: SendMessageInput): Promise<void> {
    const { body, groupId, deduplicationId, delaySeconds, messageAttributes } =
      input;
    const command = new SendMessageCommand({
      QueueUrl: `${this.provider.queueBaseUrl}/${queueName}`,
      MessageGroupId: groupId,
      DelaySeconds: delaySeconds,
      MessageDeduplicationId: deduplicationId,
      MessageSystemAttributes: messageAttributes,
      MessageBody: body,
      MessageAttributes: messageAttributes,
    });

    await this.provider.client.send(command);
  }

  public async purgeQueue(queueName: string): Promise<void> {
    //TODO: WILL BE IMPLEMENTED LATER
    return;
  }
}
