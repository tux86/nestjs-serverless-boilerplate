import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateType } from './gql/email-template.type';
import { CreateEmailTemplateInput } from './gql/create-email-template.input';
import { EmailTemplateService } from './email-template.service';

@Resolver(() => EmailTemplateType)
export class EmailTemplateResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query((returns) => [EmailTemplateType])
  emailTemplates(): Promise<EmailTemplateType[]> {
    return this.emailTemplateService.getEmailTemplates();
  }

  @Mutation(() => EmailTemplateType)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplateType> {
    return await this.emailTemplateService.createEmailTemplate(input);
  }
}
