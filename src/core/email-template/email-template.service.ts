import { Injectable } from '@nestjs/common';
import { EmailTemplate } from './email-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTemplateRepository } from './email-template.repository';
import { EmailTemplatePlaceholderName } from './enums/email-template-placeholder.enum';
import { EmailTemplatePlaceholderType } from './dtos/email-template-placeholder.type';
import { CreateEmailTemplateInput } from './dtos/create-email-template.input';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplateRepository)
    private emailTemplateRepository: EmailTemplateRepository,
  ) {
    console.log('============================= EmailTemplateService LOADED');
  }

  public getEmailTemplatePlaceholders(): EmailTemplatePlaceholderType[] {
    const result: EmailTemplatePlaceholderType[] = [];
    for (const name in EmailTemplatePlaceholderName) {
      result.push({
        name,
        value: EmailTemplatePlaceholderName[name],
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
