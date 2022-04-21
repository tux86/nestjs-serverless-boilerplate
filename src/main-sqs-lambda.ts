import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, SQSEvent } from 'aws-lambda';
import { INestApplicationContext } from '@nestjs/common';
import { SqsConsumer } from './modules/aws/sqs/sqs.consumer';

let cachedApp: INestApplicationContext;

export const handler: Handler = async (event: SQSEvent) => {
  cachedApp = cachedApp
    ? cachedApp
    : await NestFactory.createApplicationContext(AppModule);

  const consumer = cachedApp.get(SqsConsumer);
  await consumer.handler(event);
};
