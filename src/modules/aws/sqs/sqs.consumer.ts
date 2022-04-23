import { Injectable, Logger } from '@nestjs/common';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { SqsHandlersRegistry } from './sqs-handlers-registry';
import { SqsMessageTransformer } from '../ses/transformer/sqs.message.transformer';

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
        this.logger.debug(`new Message(${messageId}) from Queue(${queueName})`);
        const messageHandler = this.registry.getHandler(queueName);
        const message = SqsMessageTransformer.transform(record);
        await messageHandler(message);
      }
    } catch (error) {
      this.logger.error(`Error `, error.stack);
    }
  }
}
