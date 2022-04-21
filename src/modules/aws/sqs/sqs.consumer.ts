import { Injectable, Logger } from '@nestjs/common';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { SqsService } from './sqs.service';
import { Message } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsConsumer {
  logger = new Logger('SqsConsumer');
  constructor(private readonly sqsService: SqsService) {}
  public async handler(event: SQSEvent) {
    try {
      const records: SQSRecord[] = event.Records;

      if (records.length === 0) {
        return;
      }

      for (const record of records) {
        const { eventSourceARN } = record;
        const queueName = eventSourceARN.split(':').pop();
        this.logger.debug(
          'new message from SQS Queue : ' + queueName,
          // JSON.stringify(record, null, 2),
        );

        const messageHandler = this.sqsService.messageHandlers.get(queueName);
        if (!messageHandler) {
          throw new Error(`no message handler found for queue : ${queueName}`);
        }

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

        messageHandler(message);
      }
    } catch (error) {
      this.logger.error(`Error `, error.stack);
    }
  }
}
