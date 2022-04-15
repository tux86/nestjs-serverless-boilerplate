import { Injectable } from '@nestjs/common';
import { EmailTemplate } from './entities/email-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmailTemplateInput } from './gql/create-email-template.input';
import { EmailTemplateRepository } from './email-template.repository';
import { EmailTemplatePlaceholder } from './enum/email-template-placeholder.enum';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplateRepository)
    private emailTemplateRepository: EmailTemplateRepository,
  ) {}

  public getPlaceholders(): EmailTemplatePlaceholder[] {
    return Object.values(EmailTemplatePlaceholder);
  }

  public async getEmailTemplates(): Promise<EmailTemplate[]> {
    return this.emailTemplateRepository.getEmailTemplates();
  }

  public async createEmailTemplate(
    input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    return this.emailTemplateRepository.createEmailTemplate(input);
  }
}
