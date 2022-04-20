import { Message } from '@aws-sdk/client-sqs';

export type QueueName = string;

export interface SqsMessageHandlerMeta {
  queueName: string;
}

export type MessageHandler = (message: Message) => void;
