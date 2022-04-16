import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateType } from './gql/email-template.type';
import { CreateEmailTemplateInput } from './gql/create-email-template.input';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplatePlaceholder } from './enum/email-template-placeholder.enum';
import { EmailTemplatePlaceholderObject } from './gql/email-template-placeholder-object.type';

@Resolver(() => EmailTemplateType)
export class EmailTemplateResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query((returns) => [EmailTemplateType])
  emailTemplates(): Promise<EmailTemplateType[]> {
    return this.emailTemplateService.getEmailTemplates();
  }

  @Query((returns) => [EmailTemplatePlaceholderObject])
  emailTemplatePlaceholders(): EmailTemplatePlaceholderObject[] {
    return this.emailTemplateService.getEmailTemplatePlaceholders();
  }

  @Mutation(() => EmailTemplateType)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplateType> {
    return await this.emailTemplateService.createEmailTemplate(input);
  }
}
