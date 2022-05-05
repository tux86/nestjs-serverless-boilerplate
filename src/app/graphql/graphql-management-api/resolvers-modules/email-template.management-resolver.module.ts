import { Module } from '@nestjs/common';
import { EmailTemplateModule } from '../../../email-template/email-template.module';
import { EmailTemplateManagementResolver } from '../../../email-template/resolvers/email-template.management.resolver';

@Module({
  imports: [EmailTemplateModule],
  providers: [EmailTemplateManagementResolver],
})
export class EmailTemplateManagementResolverModule {}
