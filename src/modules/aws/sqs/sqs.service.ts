import { Injectable, Logger } from '@nestjs/common';
import {
  DeleteMessageBatchCommand,
  Message,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';
import { SqsClientProvider } from './sqs-client.provider';

/**
 * @class SqsService
 */
@Injectable()
export class SqsService {
  private readonly logger = new Logger(SqsService.name);

  constructor(private readonly provider: SqsClientProvider) {
    this.logger.debug('SQS service initialized');
  }

  // returns queue url from queue name
  public getQueueUrl(queueName: string): string {
    return `${this.provider.queueBaseUrl}/${queueName}`;
  }

  /**
   *  send message to sqs queue
   * @param queueName
   * @param input
   */
  public async send<T = any>(
    queueName: string,
    input: SendMessageInput,
  ): Promise<void> {
    const { body, groupId, deduplicationId, delaySeconds, messageAttributes } =
      input;
    const command = new SendMessageCommand({
      QueueUrl: this.getQueueUrl(queueName),
      MessageGroupId: groupId,
      DelaySeconds: delaySeconds,
      MessageDeduplicationId: deduplicationId,
      MessageSystemAttributes: messageAttributes,
      MessageBody:
        typeof body === 'string' ? body : (JSON.stringify(body) as any),
      MessageAttributes: messageAttributes,
    });

    await this.provider.client.send(command);
  }

  /**
   * purge a queue by name
   * @param queueName
   */
  public async purgeQueue(queueName: string): Promise<void> {
    //TODO: WILL BE IMPLEMENTED LATER
    return;
  }

  /**
   * delete messages from a queue
   * @param queueName
   * @param messages
   */
  public async deleteMessages(queueName: string, messages: Message[]) {
    this.logger.debug('delete sqs message from queue');
    const command = new DeleteMessageBatchCommand({
      QueueUrl: this.getQueueUrl(queueName),
      Entries: messages.map(({ MessageId, ReceiptHandle }) => ({
        Id: MessageId,
        ReceiptHandle,
      })),
    });
    await this.provider.client.send(command);
  }
}
