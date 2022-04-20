import { SetMetadata } from '@nestjs/common';
import { SQS_MESSAGE_HANDLER } from './sqs.constants';

export const SqsMessageHandler = (queueName: string) =>
  SetMetadata(SQS_MESSAGE_HANDLER, { queueName });
