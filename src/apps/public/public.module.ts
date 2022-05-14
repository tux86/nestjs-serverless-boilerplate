import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { OrganizationModule } from '@/core/organization/organization.module';
import { CoreModule } from '@/core/core.module';
import { Logger, Module } from '@nestjs/common';
import { config } from '@/config';
import { HealthCheckerModule } from '@/core/health-checker/health-checker.module';
import { SESModule } from '@/core/aws/ses/ses.module';
import { graphqlConfig } from '@/shared/utils/graphql/graphql-config.util';
import { resolvers } from './resolvers';
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
    CoreModule,
    SESModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [...resolvers],
})
export class PublicModule {
  private readonly logger = new Logger(PublicModule.name);

  constructor(config: ConfigService) {
    appModuleLogInfo(config, this.logger);
  }
}
