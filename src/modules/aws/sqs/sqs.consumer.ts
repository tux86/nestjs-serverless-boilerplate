import { Injectable, Logger } from '@nestjs/common';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { Message } from '@aws-sdk/client-sqs';
import { SqsHandlersRegistry } from './sqs-handlers-registry';

@Injectable()
export class SqsConsumer {
  logger = new Logger('SqsConsumer');
  constructor(private readonly registry: SqsHandlersRegistry) {}
  public async handler(event: SQSEvent) {
    try {
      const records: SQSRecord[] = event.Records;

      if (records.length === 0) {
        return;
      }

      for (const record of records) {
        const { messageId, eventSourceARN } = record;
        const queueName = eventSourceARN.split(':').pop();
        this.logger.debug(
          `new message(${messageId}) consumed from queue(${queueName})`,
        );

        const messageHandler = this.registry.getHandler(queueName);

        // transform payload from Record type to Message type
        const message: Message = {
          MessageId: record.messageId,
          ReceiptHandle: record.receiptHandle,
          MD5OfBody: record.md5OfBody,
          Body: record.body,
          // MessageSystemAttributeMap TODO: data mapping
          // Attributes: record.attributes,

          //MessageBodyAttributeMap TODO: data mapping
          //MessageAttributes: record.messageAttributes;
        };

        await messageHandler(message);
      }
    } catch (error) {
      this.logger.error(`Error `, error.stack);
    }
  }
}
