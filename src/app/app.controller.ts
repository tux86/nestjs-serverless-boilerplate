import { Controller, Get, UseGuards } from '@nestjs/common';
import { EmailTemplateService } from './email-template/email-template.service';
import { OrganizationService } from './organization/organization.service';

@Controller()
export class AppController {
  constructor(private organizationService: OrganizationService) {}
  @Get('/test')
  test(): any {
    return this.organizationService.create({
      orgId: 'MP921222',
      name: 'xxx',
    });
  }
}
