import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, SQSEvent, SQSRecord } from 'aws-lambda';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { SqsService } from './modules/aws/sqs/sqs.service';
import { Message } from '@aws-sdk/client-sqs';

const logger = new Logger('SQSHandler');

let cachedApp: INestApplicationContext;

export const handler: Handler = async (event: SQSEvent) => {
  try {
    cachedApp = cachedApp
      ? cachedApp
      : await NestFactory.createApplicationContext(AppModule);

    //  await cachedApp.init();
    const records: SQSRecord[] = event.Records;

    if (records.length === 0) {
      return;
    }

    const sqsService = cachedApp.get(SqsService);

    // const mailerConsumer = cachedApp.get(MailerConsumer);

    for (const record of records) {
      const { eventSourceARN } = record;
      const queueName = eventSourceARN.split(':').pop();
      logger.debug(
        'new message from SQS Queue : ' + queueName,
        // JSON.stringify(record, null, 2),
      );

      const messageHandler = sqsService.messageHandlers.get(queueName);
      if (!messageHandler) {
        throw new Error(`no message handler found for queue : ${queueName}`);
      }

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
    logger.error(`Error `, error.stack);
  }
};
