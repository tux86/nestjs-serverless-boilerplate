import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateService } from '@/core/email-template/email-template.service';
import { EmailTemplate } from '@/core/email-template/email-template.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/core/auth/guards/jwt-auth.guard';
import { CreateEmailTemplateInput } from '@/core/email-template/dtos/create-email-template.input';

@Resolver(() => EmailTemplate)
export class EmailTemplateResolver {
  constructor(private readonly service: EmailTemplateService) {}

  @Query(() => [EmailTemplate])
  @UseGuards(JwtAuthGuard)
  async emailTemplates(): Promise<EmailTemplate[]> {
    return await this.service.getEmailTemplates();
  }

  // @Query(() => [EmailTemplatePlaceholder])
  // emailTemplatePlaceholders(): EmailTemplatePlaceholder[] {
  //   return this.emailTemplateService.getEmailTemplatePlaceholders();
  // }

  @Mutation(() => EmailTemplate)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    return await this.service.createEmailTemplate(input);
  }
}
