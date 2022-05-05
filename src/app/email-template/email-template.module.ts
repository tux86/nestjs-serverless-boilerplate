import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateRepository } from './email-template.repository';
import { EmailTemplateResolver } from './resolvers/email-template.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateRepository])],
  providers: [EmailTemplateService, EmailTemplateResolver],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule {}
