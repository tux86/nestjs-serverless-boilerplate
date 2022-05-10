import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../../core/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { OrganizationModule } from '../../core/organization/organization.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import configuration from '../../config';
import { resolvers } from './resolvers';
import { appGlobalPrefix } from '../../shared/utils/app.util';
import { getEndpointGraphqlConfig } from '../../shared/utils/graphql.util';
import { HealthCheckerModule } from '../../core/health-checker/health-checker.module';
import { appModuleLogInfo } from '../../shared/utils/bootstrap.util';
import { ParameterModule } from '../../core/parameter/parameter.module';

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
    OrganizationModule,
    ParameterModule,
  ],
  controllers: [],
  providers: [...resolvers],
})
export class InternalModule {
  private readonly logger = new Logger(InternalModule.name);

  constructor(config: ConfigService) {
    appModuleLogInfo(config, this.logger);
  }
}
