import { Controller, Get, UseGuards } from '@nestjs/common';
import { EmailTemplateService } from './email-template/email-template.service';

@Controller()
export class AppController {
  constructor(private emailTemplateService: EmailTemplateService) {}
  @Get('/test')
  test(): any {
    return this.emailTemplateService.getEmailTemplates();
  }
}
