import { Controller, Get } from '@nestjs/common';
import { SESService } from './ses.service';
import { ConfigService } from '@nestjs/config';

@Controller('aws/ses/testSendEmail')
export class SESController {
  constructor(private config: ConfigService, private sesService: SESService) {}

  @Get('success')
  async sendEmailSuccessTest(): Promise<void> {
    const from = this.config.get('aws.ses.defaultSenderAddress');
    await this.sesService.sendEmail({
      from,
      to: [process.env.TEST_RECIPIENT_ADDRESS],
      subject: 'test email ' + Math.random(),
      html: '<p>Hello !</p>',
      text: 'Hello !',
    });
  }

  @Get('fail')
  async sendEmailFailTest(): Promise<void> {
    const from = this.config.get('aws.ses.defaultSenderAddress');
    await this.sesService.sendEmail({
      from,
      to: [],
      subject: '',
      html: '',
      text: '',
    });
  }
}
