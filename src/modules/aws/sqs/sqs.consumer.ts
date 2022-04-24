import { Logger } from '@nestjs/common';
import { MessageHandler } from './types/sqs.types';
import { Message } from '@aws-sdk/client-sqs';
import {
  SQS_MESSAGE_PROCESSED_HANDLER,
  SQS_MESSAGE_PROCESSING_ERROR_HANDLER,
  SQS_MESSAGE_RECEIVED_HANDLER,
} from './constants/message-handler.constants';

export class SqsConsumer {
  private readonly logger: Logger;

  private handlers: { [key: string]: MessageHandler | undefined } = {
    SQS_MESSAGE_RECEIVED_HANDLER: undefined,
    SQS_MESSAGE_PROCESSED_HANDLER: undefined,
    SQS_MESSAGE_PROCESSING_ERROR_HANDLER: undefined,
  };

  constructor(public readonly queueName: string) {
    this.logger = new Logger(`SqsConsumer::${queueName}`);
    this.logger.debug(`Consumer initialized`);
  }

  public setHandler(name: string, handler: MessageHandler): void {
    if (this.handlers[name] !== undefined) {
      throw new Error(
        `${String(
          SQS_MESSAGE_RECEIVED_HANDLER,
        )}: already defined for this queue`,
      );
    }
    this.handlers[name] = handler;
    this.logger.debug(`${name} is bound to consumer handler`);
  }

  public async runHandler(name: string, ...args: any) {
    const handler = this.handlers[name];
    if (handler) {
      await handler.apply(this, args);
    }
  }

  public async handleMessage(message: Message): Promise<void> {
    try {
      await this.runHandler(String(SQS_MESSAGE_RECEIVED_HANDLER), message);
      await this.runHandler(String(SQS_MESSAGE_PROCESSED_HANDLER), message);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      await this.runHandler(
        String(SQS_MESSAGE_PROCESSING_ERROR_HANDLER),
        error,
        message,
      );
    }
  }
}
