import awsLambdaFastify, {
  LambdaResponse,
  PromiseHandler,
} from 'aws-lambda-fastify';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { bootstrapServer, NestApp } from './shared/utils/bootstrap.util';

let cachedNestApp: NestApp;
let cachedProxy: PromiseHandler<unknown, LambdaResponse>;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!cachedNestApp) {
    cachedNestApp = await bootstrapServer();
  }
  if (!cachedProxy) {
    cachedProxy = awsLambdaFastify(cachedNestApp.instance, {
      decorateRequest: true,
    });
    await cachedNestApp.instance.ready();
  }
  return cachedProxy(event, context);
};
