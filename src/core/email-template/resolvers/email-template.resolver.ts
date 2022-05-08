import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateService } from '../email-template.service';
import { CatType } from '../dtos/cat.type';
import { EmailTemplate } from '../entities/email-template.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateEmailTemplateInput } from '../dtos/create-email-template.input';

@Resolver(() => CatType)
export class EmailTemplateResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query(() => [EmailTemplate])
  @UseGuards(JwtAuthGuard)
  async emailTemplates(): Promise<EmailTemplate[]> {
    return await this.emailTemplateService.getEmailTemplates();
  }

  // @Query(() => [EmailTemplatePlaceholder])
  // emailTemplatePlaceholders(): EmailTemplatePlaceholder[] {
  //   return this.emailTemplateService.getEmailTemplatePlaceholders();
  // }

  @Mutation(() => EmailTemplate)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplate> {
    return await this.emailTemplateService.createEmailTemplate(input);
  }

  @Query(() => [CatType])
  cats(): CatType[] {
    const xx = this.emailTemplateService.getEmailTemplates();

    return [
      {
        name: 'caaaaaaaaaaaaaaaaaat !',
      },
    ];
  }
}
