import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FakeSmtpClientProvider {
  private readonly logger = new Logger(FakeSmtpClientProvider.name);
  public readonly client: Transporter;
  public readonly isEnabled: boolean;
  constructor(private readonly config: ConfigService) {
    this.isEnabled = this.config.get<boolean>('aws.ses.mailHog.enabled');
    if (this.isEnabled) {
      const host = this.config.get('aws.ses.mailHog.host');
      const smtpPort = this.config.get<number>('aws.ses.mailHog.smtpPort');
      const uiPort = this.config.get<number>('aws.ses.mailHog.uiPort');
      this.client = nodemailer.createTransport({ host, port: smtpPort });
      this.logger.debug(`Connected to SMTP Server: ${host}:${smtpPort}`);
      this.logger.debug('Fake SMTP client initialized');
      this.logger.debug(`🌐 MailHog UI : http://${host}:${uiPort}`);
    } else {
      this.logger.debug('Fake SMTP client disabled from config');
    }
  }
}
