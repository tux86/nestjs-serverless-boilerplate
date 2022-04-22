import { Injectable, Logger } from '@nestjs/common';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { SendEmailParameters } from './dtos/send-email-parameters';
import { SqsService } from '../sqs/sqs.service';
import awsConfig from '../../../config/aws.config';
import { SESProvider } from './ses.provider';
import { ConfigService } from '@nestjs/config';
import { FakeSmtpClientProvider } from './fake.smtp.client.provider';
const DEFAULT_CHARSET = 'UTF-8';
const EmailQueueName = awsConfig.sqs.queueNames.emailQueue;

@Injectable()
export class SESService {
  private readonly logger = new Logger(SESService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly sesProvider: SESProvider,
    private readonly fakeProvider: FakeSmtpClientProvider,
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
   * send email to fake SMTP Server
   * @param input
   * @private
   */
  private async fakerSendEmail(input: SendEmailParameters) {
    await this.fakeProvider.client.sendMail({
      ...input,
    });
    return;
  }

  /**
   * send email synchronous (ses)
   * @param input
   */
  public async sesSendEmail(input: SendEmailParameters): Promise<void> {
    const { from, cc, bcc, to, subject, text, html } = input;

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
            Data: html,
          },
          Text: {
            Charset: DEFAULT_CHARSET,
            Data: text,
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
    await this.sesProvider.client.send(command);
  }

  /**
   * send mail synchronous
   * @param input
   */
  public async sendEmailSync(input: SendEmailParameters) {
    try {
      if (this.fakeProvider.isEnabled) {
        await this.fakerSendEmail(input);
      } else {
        await this.sesSendEmail(input);
      }
    } catch (error) {
      this.logger.error('failed to send email', error);
    }
  }
}
