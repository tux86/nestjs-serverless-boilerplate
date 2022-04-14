import { EntityRepository, Repository } from 'typeorm';
import { EmailTemplate } from './entities/email-template.entity';
import { CreateEmailTemplateInput } from './gql/create-email-template.input';
import { v4 as uuid } from 'uuid';

@EntityRepository(EmailTemplate)
export class EmailTemplateRepository extends Repository<EmailTemplate> {
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
