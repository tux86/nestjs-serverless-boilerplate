import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, SQSEvent } from 'aws-lambda';
import { Logger } from '@nestjs/common';
import { SQSRecord } from 'aws-lambda/trigger/sqs';

const logger = new Logger('SQSHandler');

export const handler: Handler = async (event: SQSEvent) => {
  try {
    const appContext = await NestFactory.createApplicationContext(AppModule);

    const records: SQSRecord[] = event.Records;

    for (const record of records) {
      const { eventSourceARN } = record;
      const queueName = eventSourceARN.split(':').pop();

      logger.debug('queueName :' + queueName);
    }
    // logger.debug(
    //   'new message from SQS Queue',
    //   JSON.stringify(event.Records, null, 2),
    // );
    //const sqsSnsService = appContext.get(SqsSnsService);
    //await sqsSnsService.catalogBatchProcess(event);
  } catch (error) {
    logger.error(`Error `, error.stack);
  }
};
