import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { SendEmailParameters } from './dtos/send-email-parameters';

const DEFAULT_CHARSET = 'UTF-8';

@Injectable()
export class SesService {
  private readonly client: SESClient;
  private readonly logger = new Logger(SesService.name);

  constructor(private config: ConfigService) {
    this.logger.debug('initializing ses client');
    const region = config.get('aws.region');
    this.client = new SESClient({ region });
  }

  public async sendEmail(input: SendEmailParameters): Promise<void> {
    const { from, subject, html, text } = input;
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
    await this.client.send(command);
  }
}
