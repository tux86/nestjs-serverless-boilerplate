import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { SendEmailParameters } from './dtos/send-email-parameters';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailSendSuccessEvent } from './events/email-send-success.event';
import { EmailSendFailedEvent } from './events/email-send-failed.event';

const DEFAULT_CHARSET = 'UTF-8';

@Injectable()
export class SESService {
  private readonly client: SESClient;
  private readonly logger = new Logger(SESService.name);

  constructor(
    private config: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    const region = config.get('aws.region');
    this.client = new SESClient({ region });
    this.logger.debug('ses service initialized');
  }

  public async sendEmail(input: SendEmailParameters): Promise<void> {
    try {
      const { from, subject, bodyText, bodyHtml } = input;
      const { cc, bcc, to } = input.destination;
      const command = new SendEmailCommand({
        Destination: {
          CcAddresses: cc,
          BccAddresses: bcc,
          ToAddresses: [''],
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
      await this.client.send(command);
      this.eventEmitter.emit('email.send.success', new EmailSendSuccessEvent());
    } catch (error) {
      this.logger.error('failed to send email', error);
      this.eventEmitter.emit('email.send.failed', new EmailSendFailedEvent());
    }
  }
}
