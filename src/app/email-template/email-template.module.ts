import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateRepository } from './email-template.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateRepository])],
  providers: [EmailTemplateService],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule {}
