import { Injectable, Logger } from '@nestjs/common';

import { SqsMessageHandler } from '../aws/sqs/sqs.decorators';
import { Message } from '@aws-sdk/client-sqs';

const EMAIL_QUEUE_NAME = 'nestjs-serverless-poc-EmailQueue-dev';

@Injectable()
export class MailerConsumer {
  logger = new Logger(MailerConsumer.name);

  @SqsMessageHandler(EMAIL_QUEUE_NAME)
  onMessageReceived(message: Message) {
    this.logger.debug(
      '&&&&&&&&&&&&&&&&&&&&&&&&& sqs message received' +
        JSON.stringify(message, null, 2),
    );
  }
}
