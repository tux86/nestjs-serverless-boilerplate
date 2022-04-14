import { EntityRepository, Repository } from 'typeorm';
import { EmailTemplate } from './email-template.entity';
import { CreateEmailTemplateInput } from './dto/create-email-template.input';
import { v4 as uuid } from 'uuid';

@EntityRepository(EmailTemplate)
export class EmailTemplateRepository extends Repository<EmailTemplate> {
  async createEmailTemplate(
    input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    const { name, subject, body } = input;

    const emailTemplate = this.create({
      emailTemplateId: uuid(),
      name,
      subject,
      body,
    });

    await this.save(emailTemplate);
    return emailTemplate;
  }
}
