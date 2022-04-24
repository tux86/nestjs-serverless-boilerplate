import { EntityRepository, Repository } from "typeorm";
import { EmailTemplate } from "./entities/email-template.entity";
import { CreateEmailTemplateInput } from "./dtos/create-email-template.input";
import { v4 as uuid } from "uuid";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(EmailTemplate)
export class EmailTemplateRepository extends Repository<EmailTemplate> {
  private logger = new Logger(EmailTemplateRepository.name, {
    timestamp: true
  });

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    const query = this.createQueryBuilder("emailTemplate");

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `query [ getEmailTemplates ] error . Filters: ${{}}"`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async createEmailTemplate(
    input: CreateEmailTemplateInput
  ): Promise<EmailTemplate> {
    const { name, subject, bodyText, bodyHtml } = input;

    const emailTemplate = this.create({
      emailTemplateId: uuid(),
      name,
      subject,
      bodyText,
      bodyHtml
    });

    await this.save(emailTemplate);
    return emailTemplate;
  }
}
