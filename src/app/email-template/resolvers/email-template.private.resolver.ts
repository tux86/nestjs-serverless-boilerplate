import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateService } from '../email-template.service';
import { EmailTemplatePlaceholderObject } from '../dtos/email-template-placeholder-object.type';
import { EmailTemplate } from '../entities/email-template.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateEmailTemplateInput } from '../dtos/create-email-template.input';

@Resolver(() => EmailTemplate)
export class EmailTemplatePrivateResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query(() => [EmailTemplate])
  @UseGuards(JwtAuthGuard)
  emailTemplates(): Promise<EmailTemplate[]> {
    return this.emailTemplateService.getEmailTemplates();
  }

  @Query(() => [EmailTemplatePlaceholderObject])
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
