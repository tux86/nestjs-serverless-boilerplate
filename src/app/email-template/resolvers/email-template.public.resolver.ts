import { Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateService } from '../email-template.service';

import { Cat } from '../../../shared/graphql/public.graphql';

@Resolver(() => Cat)
export class EmailTemplatePublicResolver {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Query(() => [Cat])
  cats(): Cat[] {
    const xx = this.emailTemplateService.getEmailTemplates();

    return [
      {
        name: 'caaaaaaaaaaaaaaaaaat !',
      },
    ];
  }
}
