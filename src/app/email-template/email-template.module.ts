import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateRepository } from './email-template.repository';
import { EmailTemplatePrivateResolver } from './resolvers/email-template.private.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateRepository])],
  providers: [EmailTemplatePrivateResolver, EmailTemplateService],
})
export class EmailTemplateModule {}
