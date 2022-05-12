import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../../core/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { OrganizationModule } from '../../core/organization/organization.module';
import { CoreModule } from '../../core/core.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import configuration from '../../config';
import { HealthCheckerModule } from '../../core/health-checker/health-checker.module';
import { SESModule } from '../../core/aws/ses/ses.module';
import { appGlobalPrefix } from '../../shared/utils/app.util';
import { graphqlConfig } from '../../shared/utils/graphql/graphql-config.util';
import { resolvers } from './resolvers';
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
      graphqlConfig({
        path: `${appGlobalPrefix}/graphql`,
      }),
    ),
    EventEmitterModule.forRoot(),
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
