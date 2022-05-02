export interface SqsMessageReceivedHandlerMeta {
  queueName: string;
}

export interface SqsMessageProcessedHandlerMeta {
  queueName: string;
}

export interface SqsMessageProcessingErrorHandlerMeta {
  queueName: string;
}
