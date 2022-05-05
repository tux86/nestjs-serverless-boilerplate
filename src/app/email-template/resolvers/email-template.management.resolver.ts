import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';

import {
  CreateEmailTemplateInput,
  EmailTemplate,
} from '../../../shared/graphql/management.graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { EmailTemplateService } from '../email-template.service';

@Resolver(() => EmailTemplate)
export class EmailTemplateManagementResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query(() => [EmailTemplate])
  @UseGuards(JwtAuthGuard)
  async emailTemplates() {
    return await this.emailTemplateService.getEmailTemplates();
  }

  // @Query(() => [EmailTemplatePlaceholder])
  // emailTemplatePlaceholders(): EmailTemplatePlaceholder[] {
  //   return this.emailTemplateService.getEmailTemplatePlaceholders();
  // }

  @Mutation(() => EmailTemplate)
  async createEmailTemplate(@Args('input') input: CreateEmailTemplateInput) {
    return await this.emailTemplateService.createEmailTemplate(input);
  }
}
