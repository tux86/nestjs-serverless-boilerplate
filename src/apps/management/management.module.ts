import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { OrganizationModule } from '@/core/organization/organization.module';
import { CoreModule } from '@/core/core.module';
import { Logger, Module } from '@nestjs/common';
import { config } from '@/config';
import { graphqlConfig } from '@/shared/utils/graphql/graphql-config.util';
import { resolvers } from './resolvers';
import { UserModule } from '@/core/user/user.module';
import { EmailTemplateModule } from '@/core/email-template/email-template.module';
import { HealthCheckerModule } from '@/core/health-checker/health-checker.module';
import { appModuleLogInfo } from '@/bootstrap';

@Module({
  imports: [
    CoreModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(
      graphqlConfig({
        path: `${config.appGlobalPrefix}/graphql`,
      }),
    ),
    HealthCheckerModule,
    OrganizationModule,
    UserModule,
    EmailTemplateModule,
  ],
  controllers: [],
  providers: [...resolvers],
})
export class ManagementModule {
  private readonly logger = new Logger(ManagementModule.name);

  constructor(config: ConfigService) {
    appModuleLogInfo(config, this.logger);
  }
}
