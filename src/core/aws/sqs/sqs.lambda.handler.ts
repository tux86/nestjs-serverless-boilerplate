import { Injectable, Logger } from '@nestjs/common';
import { Context, Handler, SQSEvent, SQSRecord } from 'aws-lambda';
import { SqsMessageTransformer } from './transformers/sqs.message.transformer';
import { SqsConsumersRegistry } from './sqs.consumers.registry';

@Injectable()
export class SqsLambdaHandler {
  private readonly logger = new Logger(SqsLambdaHandler.name);

  constructor(private readonly registry: SqsConsumersRegistry) {}

  public async handler(event: SQSEvent, context: Context): Promise<Handler> {
    const records: SQSRecord[] = event.Records;
    if (records.length === 0) {
      return;
    }
    for (const record of records) {
      try {
        const queueName = record.eventSourceARN.split(':').pop();
        const message = SqsMessageTransformer.transform(record);
        const consumer = this.registry.getConsumer(queueName);
        await consumer.handleMessage(message);
      } catch (error) {
        this.logger.error(error);
      }
    }
  }
}
