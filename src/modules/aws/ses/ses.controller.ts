import { Controller, Get } from '@nestjs/common';
import { SesService } from './ses.service';
import { ConfigService } from '@nestjs/config';

@Controller('aws/ses')
export class SesController {
  constructor(
    private config: ConfigService,
    private readonly sesService: SesService,
  ) {}

  @Get('sendEmailTest')
  async sendEmailTest(): Promise<void> {
    const from = this.config.get('defaultFromEmail');
    await this.sesService.sendEmail({
      from,
      destination: {
        to: [process.env.DESTINATION_EMAIL_TEST],
      },
      subject: 'test email',
      html: '<p>Hello !</p>',
      text: 'Hello !',
    });
  }
}
