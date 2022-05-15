import { EntityRepository, Repository } from 'typeorm';
import { EmailTemplate } from './email-template.entity';
import { v4 as uuid } from 'uuid';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEmailTemplateInput } from './dtos/create-email-template.input';

@EntityRepository(EmailTemplate)
export class EmailTemplateRepository extends Repository<EmailTemplate> {
  private logger = new Logger(EmailTemplateRepository.name, {
    timestamp: true,
  });

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    const query = this.createQueryBuilder('emailTemplate');
    return await query.getMany();
  }

  async createEmailTemplate(
    input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    const { name, subject, bodyText, bodyHtml } = input;

    const emailTemplate = this.create({
      emailTemplateId: uuid(),
      name,
      subject,
      bodyText,
      bodyHtml,
    });

    await this.save(emailTemplate);
    return emailTemplate;
  }
}
