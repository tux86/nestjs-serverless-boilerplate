import { Injectable, Logger } from '@nestjs/common';
import {
  DeleteMessageBatchCommand,
  Message,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';
import { SqsClientProvider } from './sqs-client.provider';
import { sleep } from '@/shared/utils/sleep.util';

/**
 * @class SqsService
 */
@Injectable()
export class SqsService {
  private readonly logger = new Logger(SqsService.name);

  constructor(public readonly provider: SqsClientProvider) {}

  /**
   *  send message to sqs queue
   * @param queueUrl
   * @param input
   */
  public async send<T = any>(
    queueUrl: string,
    input: SendMessageInput,
  ): Promise<void> {
    const { body, groupId, deduplicationId, delaySeconds, messageAttributes } =
      input;
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
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
   * @param queueUrl
   */
  public async purgeQueue(queueUrl: string): Promise<void> {
    //TODO: WILL BE IMPLEMENTED LATER
    await sleep(1);
  }

  /**
   * delete messages from a queue
   * @param queueUrl
   * @param messages
   */
  public async deleteMessages(queueUrl: string, messages: Message[]) {
    this.logger.debug('delete sqs message from queue');
    const command = new DeleteMessageBatchCommand({
      QueueUrl: queueUrl,
      Entries: messages.map(({ MessageId, ReceiptHandle }) => ({
        Id: MessageId,
        ReceiptHandle,
      })),
    });
    await this.provider.client.send(command);
  }
}
