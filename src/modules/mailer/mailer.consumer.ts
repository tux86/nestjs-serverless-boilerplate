import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler } from '../aws/sqs/sqs.decorators';
import { Message } from '@aws-sdk/client-sqs';
import awsConfig from '../../config/aws.config';
const EmailQueueName = awsConfig.sqs.emailQueueName;

@Injectable()
export class MailerConsumer {
  logger = new Logger(MailerConsumer.name);

  @SqsMessageHandler(EmailQueueName)
  onMessageReceived(message: Message) {
    this.logger.debug(
      'sqs message received\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n' +
        JSON.stringify(message, null, 2) +
        '\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n',
    );
  }
}
