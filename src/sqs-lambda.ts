import { NestFactory } from '@nestjs/core';
import { Context, Handler, SQSEvent } from 'aws-lambda';
import { INestApplicationContext } from '@nestjs/common';
import { SqsLambdaHandler } from '@/core/aws/sqs/sqs.lambda.handler';
import { ConsumerModule } from '@/apps/consumer/consumer.module';

let cachedApp: INestApplicationContext;
export const handler: Handler = async (event: SQSEvent, context: Context) => {
  cachedApp = cachedApp
    ? cachedApp
    : await NestFactory.createApplicationContext(ConsumerModule);

  const sqsLambdaHandler = await cachedApp.get(SqsLambdaHandler);
  return await sqsLambdaHandler.handler(event, context);
};
