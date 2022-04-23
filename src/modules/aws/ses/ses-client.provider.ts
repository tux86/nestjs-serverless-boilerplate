import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';

/**
 * Provides a Mail Client : Transporter
 *
 * depending on the configuration the provided mail client
 * could communicate with a local SMTP server or AWS SES service
 *
 */
@Injectable()
export class SESClientProvider {
  private readonly logger = new Logger(SESClientProvider.name);
  public readonly client: Transporter;

  constructor(private readonly config: ConfigService) {
    const isLocalServer = this.config.get<boolean>('aws.ses.mailHog.enabled');
    if (isLocalServer) {
      // Transport SMTP client
      this.logger.debug('connecting to local SMTP Server');
      const host = this.config.get('aws.ses.mailHog.host');
      const smtpPort = this.config.get<number>('aws.ses.mailHog.smtpPort');
      const uiPort = this.config.get<number>('aws.ses.mailHog.uiPort');
      this.client = nodemailer.createTransport({ host, port: smtpPort });
      this.logger.debug(`Connected to SMTP Server: ${host}:${smtpPort}`);
      this.logger.debug('Fake SMTP client initialized');
      this.logger.debug(`🌐 MailHog UI : http://${host}:${uiPort}`);
    } else {
      // Transport SES client wrapper
      const region = config.get('aws.region');
      this.client = nodemailer.createTransport({
        SES: {
          apiVersion: '2010-12-01',
          ses: new SES({ region }),
          aws: { SendRawEmailCommand },
        },
      });
    }
  }
}
