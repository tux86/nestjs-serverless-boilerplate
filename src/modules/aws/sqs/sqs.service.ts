import { Injectable, Logger } from '@nestjs/common';
import {
  DeleteMessageBatchCommand,
  Message,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';
import { SqsClientProvider } from './sqs-client.provider';

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

  // send message to sqs queue
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

    await this.provider.client.send(command);
  }

  public async purgeQueue(queueName: string): Promise<void> {
    //TODO: WILL BE IMPLEMENTED LATER
    return;
  }

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
