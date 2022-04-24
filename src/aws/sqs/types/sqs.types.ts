import { Message } from '@aws-sdk/client-sqs';
import {
  SqsMessageProcessedHandlerMeta,
  SqsMessageProcessingErrorHandlerMeta,
  SqsMessageReceivedHandlerMeta,
} from '../interfaces/message-handler-meta.interface';

export type QueueName = string;

export type SqsMessageHandlerMetaGenericType = SqsMessageReceivedHandlerMeta &
  SqsMessageProcessedHandlerMeta &
  SqsMessageProcessingErrorHandlerMeta;

export type MessageReceivedHandler = (message: Message) => void;
export type MessageProcessedHandler = (message: Message) => void;
export type MessageProcessingErrorHandler = (
  error: Error,
  message: Message,
) => void;

export type MessageHandler = MessageReceivedHandler &
  MessageProcessedHandler &
  MessageProcessingErrorHandler;
