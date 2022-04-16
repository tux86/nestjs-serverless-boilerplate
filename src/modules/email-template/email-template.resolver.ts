import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEmailTemplateInput } from './dtos/create-email-template.input';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplatePlaceholderObject } from './dtos/email-template-placeholder-object.type';
import { EmailTemplate } from './entities/email-template.entity';

@Resolver(() => EmailTemplate)
export class EmailTemplateResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query((returns) => [EmailTemplate])
  emailTemplates(): Promise<EmailTemplate[]> {
    return this.emailTemplateService.getEmailTemplates();
  }

  @Query((returns) => [EmailTemplatePlaceholderObject])
  emailTemplatePlaceholders(): EmailTemplatePlaceholderObject[] {
    return this.emailTemplateService.getEmailTemplatePlaceholders();
  }

  @Mutation(() => EmailTemplate)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    return await this.emailTemplateService.createEmailTemplate(input);
  }
}
