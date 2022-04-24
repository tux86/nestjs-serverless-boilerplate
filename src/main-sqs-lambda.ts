import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Context, Handler, SQSEvent } from "aws-lambda";
import { INestApplicationContext } from "@nestjs/common";
import { SqsLambdaHandler } from "./aws/sqs/sqs.lambda.handler";

let cachedApp: INestApplicationContext;
export const handler: Handler = async (event: SQSEvent, context: Context) => {
  cachedApp = cachedApp
    ? cachedApp
    : await NestFactory.createApplicationContext(AppModule);

  await cachedApp.get(SqsLambdaHandler).handler(event, context);
};
