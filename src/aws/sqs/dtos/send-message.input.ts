import { MessageAttributeValue } from '@aws-sdk/client-sqs';

export interface SendMessageInput<T = any> {
  body: T;
  groupId?: string;
  deduplicationId?: string;
  delaySeconds?: number;
  messageAttributes?: {
    [key: string]: MessageAttributeValue;
  };
}
