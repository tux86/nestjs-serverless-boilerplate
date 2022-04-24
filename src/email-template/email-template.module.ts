import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailTemplateMutationsResolver } from "./resolvers/email-template.mutations.resolver";
import { EmailTemplateService } from "./email-template.service";
import { EmailTemplateRepository } from "./email-template.repository";
import { EmailTemplateQueriesResolver } from "./resolvers/email-template.queries.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateRepository])],
  providers: [
    EmailTemplateMutationsResolver,
    EmailTemplateQueriesResolver,
    EmailTemplateService
  ]
})
export class EmailTemplateModule {
}
