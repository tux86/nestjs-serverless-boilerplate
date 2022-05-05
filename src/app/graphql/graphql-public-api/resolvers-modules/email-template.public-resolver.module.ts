import { Module } from '@nestjs/common';
import { EmailTemplateModule } from '../../../email-template/email-template.module';
import { EmailTemplatePublicResolver } from '../../../email-template/resolvers/email-template.public.resolver';

@Module({
  imports: [EmailTemplateModule],
  providers: [EmailTemplatePublicResolver],
})
export class EmailTemplatePublicResolverModule {}
