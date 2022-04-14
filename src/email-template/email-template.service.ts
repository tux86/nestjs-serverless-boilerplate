import { Injectable } from '@nestjs/common';
import { EmailTemplate } from './email-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmailTemplateInput } from './dto/create-email-template.input';
import { EmailTemplateRepository } from './email-template.repository';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplateRepository)
    private emailTemplateRepository: EmailTemplateRepository,
  ) {}

  public async createEmailTemplate(
    input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    return this.emailTemplateRepository.createEmailTemplate(input);
  }
}
