import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../../core/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { OrganizationModule } from '../../core/organization/organization.module';
import { CoreModule } from '../../core/core.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import configuration from '../../config';
import { appGlobalPrefix } from '../../shared/utils/app.util';
import { getEndpointGraphqlConfig } from '../../shared/utils/graphql.util';
import { resolvers } from './resolvers';
import { UserModule } from '../../core/user/user.module';
import { EmailTemplateModule } from '../../core/email-template/email-template.module';
import { HealthCheckerModule } from '../../core/health-checker/health-checker.module';
import { appModuleLogInfo } from '../../shared/utils/bootstrap.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(
      getEndpointGraphqlConfig({
        path: `${appGlobalPrefix}/graphql`,
      }),
    ),
    EventEmitterModule.forRoot(),
    HealthCheckerModule,
    CoreModule,
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
