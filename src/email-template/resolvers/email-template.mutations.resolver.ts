import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateEmailTemplateInput } from '../dtos/create-email-template.input';
import { EmailTemplateService } from '../email-template.service';
import { EmailTemplate } from '../entities/email-template.entity';

@Resolver(() => EmailTemplate)
export class EmailTemplateMutationsResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Mutation(() => EmailTemplate)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    return await this.emailTemplateService.createEmailTemplate(input);
  }
}
