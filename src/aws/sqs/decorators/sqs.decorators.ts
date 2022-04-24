import { SetMetadata } from '@nestjs/common';
import {
  SQS_MESSAGE_PROCESSED_HANDLER,
  SQS_MESSAGE_PROCESSING_ERROR_HANDLER,
  SQS_MESSAGE_RECEIVED_HANDLER,
} from '../constants/message-handler.constants';

export const SQSMessageReceivedHandler = (queueName: string) =>
  SetMetadata(SQS_MESSAGE_RECEIVED_HANDLER, { queueName });

export const SQSMessageProcessedHandler = (queueName: string) =>
  SetMetadata(SQS_MESSAGE_PROCESSED_HANDLER, { queueName });

export const SQSMessageProcessingErrorHandler = (queueName: string) =>
  SetMetadata(SQS_MESSAGE_PROCESSING_ERROR_HANDLER, { queueName });
