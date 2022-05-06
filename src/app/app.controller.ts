import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization/organization.service';
import { sleep } from '../shared/utils/sleep.util';

@Controller()
export class AppController {
  constructor(private organizationService: OrganizationService) {}
  @Get('/testException')
  testException(): any {
    return this.organizationService.update({
      orgId: 'X8234J',
      name: 'xxx',
    });
  }

  @Get('/testTimeoutException')
  async testTimeoutException(): Promise<any> {
    await sleep(29000);
    return this.organizationService.find();
  }
}
