import { Controller, Get } from '@nestjs/common';
import { SESService } from './ses.service';
import { ConfigService } from '@nestjs/config';

@Controller('aws/ses')
export class SESController {
  constructor(private config: ConfigService, private sesService: SESService) {}

  @Get('testSendEmail')
  async sendEmailTest(): Promise<void> {
    const from = this.config.get('aws.ses.defaultSenderAddress');
    await this.sesService.sendEmail({
      from,
      to: [process.env.TEST_RECIPIENT_ADDRESS],
      subject: 'test email ' + Math.random(),
      html: '<p>Hello !</p>',
      text: 'Hello !',
    });
  }
}
