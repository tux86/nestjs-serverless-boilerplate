import { Injectable, Logger } from '@nestjs/common';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { SendEmailParameters } from './dtos/send-email-parameters';
import { SqsService } from '../sqs/sqs.service';
import awsConfig from '../../../config/aws.config';
import { SESProvider } from './ses.provider';

const DEFAULT_CHARSET = 'UTF-8';
const EmailQueueName = awsConfig.sqs.emailQueueName;

@Injectable()
export class SESService {
  private readonly client: SESClient;
  private readonly logger = new Logger(SESService.name);

  constructor(
    private readonly provider: SESProvider,
    private readonly sqsService: SqsService,
  ) {}

  /**
   * send email asynchronous (sqs queue)
   * @param input
   */
  public async sendEmail(input: SendEmailParameters): Promise<void> {
    await this.sqsService.send(EmailQueueName, {
      body: JSON.stringify(input),
    });
  }

  /**
   * send email synchronous (ses)
   * @param input
   */
  public async sendEmailSync(input: SendEmailParameters): Promise<void> {
    try {
      const { from, subject, bodyText, bodyHtml } = input;
      const { cc, bcc, to } = input.destination;
      const command = new SendEmailCommand({
        Destination: {
          CcAddresses: cc,
          BccAddresses: bcc,
          ToAddresses: to,
        },
        Message: {
          Body: {
            Html: {
              Charset: DEFAULT_CHARSET,
              Data: bodyHtml,
            },
            Text: {
              Charset: DEFAULT_CHARSET,
              Data: bodyText,
            },
          },
          Subject: {
            Charset: DEFAULT_CHARSET,
            Data: subject,
          },
        },
        Source: from,
        ReplyToAddresses: [],
      });

      await this.provider.client.send(command);
      // this.eventEmitter.emit('email.send.success', new EmailSendSuccessEvent());
    } catch (error) {
      this.logger.error('failed to send email', error);
      //  this.eventEmitter.emit('email.send.failed', new EmailSendFailedEvent());
    }
  }
}
