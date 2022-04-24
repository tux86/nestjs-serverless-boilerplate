import { Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateService } from '../email-template.service';
import { EmailTemplatePlaceholderObject } from '../dtos/email-template-placeholder-object.type';
import { EmailTemplate } from '../entities/email-template.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver(() => EmailTemplate)
export class EmailTemplateQueriesResolver {
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
}
