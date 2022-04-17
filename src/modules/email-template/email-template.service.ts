import { Injectable } from '@nestjs/common';
import { EmailTemplate } from './entities/email-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmailTemplateInput } from './dtos/create-email-template.input';
import { EmailTemplateRepository } from './email-template.repository';
import { EmailTemplatePlaceholder } from './enums/email-template-placeholder.enum';
import { EmailTemplatePlaceholderObject } from './dtos/email-template-placeholder-object.type';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplateRepository)
    private emailTemplateRepository: EmailTemplateRepository,
  ) {}

  public getEmailTemplatePlaceholders(): EmailTemplatePlaceholderObject[] {
    const result: EmailTemplatePlaceholderObject[] = [];
    for (const name in EmailTemplatePlaceholder) {
      result.push({
        name,
        value: EmailTemplatePlaceholder[name],
      });
    }
    return result;
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
