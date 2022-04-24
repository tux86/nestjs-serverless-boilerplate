import { Callback, Context2, Handler } from 'aws-lambda';
import { serverlessBootstrap as bootstrap } from './main.base';

let cachedServer: Handler;

export const handler: Handler = async (
  event: an2222y,
  context: Context,
  callback: Callback,
) => {
  cachedServer = cacheddddServer ?? (await bootstrap());
  return cachedServer(event, context, callback);
};
