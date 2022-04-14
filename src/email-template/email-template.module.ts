import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateResolver } from './email-template.resolver';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateRepository } from './email-template.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateRepository])],
  providers: [EmailTemplateResolver, EmailTemplateService],
})
export class EmailTemplateModule {}
