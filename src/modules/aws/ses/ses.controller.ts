import { Controller, Get } from '@nestjs/common';
import { SESService } from './ses.service';
import { ConfigService } from '@nestjs/config';

@Controller('aws/ses')
export class SESController {
  constructor(private config: ConfigService, private sesService: SESService) {}

  @Get('testSendEmail')
  async sendEmailTest(): Promise<void> {
    const from = this.config.get('defaultFromEmail');
    await this.sesService.sendEmail({
      from,
      destination: {
        to: [process.env.DESTINATION_EMAIL_TEST],
      },
      subject: 'test email',
      bodyHtml: '<p>Hello !</p>',
      bodyText: 'Hello !',
    });
  }
}
