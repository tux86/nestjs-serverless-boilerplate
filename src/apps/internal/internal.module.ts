import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@/core/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { OrganizationModule } from '@/core/organization/organization.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import configuration, { config } from '@/config';
import { resolvers } from './resolvers';
import { graphqlConfig } from '@/shared/utils/graphql/graphql-config.util';
import { HealthCheckerModule } from '@/core/health-checker/health-checker.module';
import { appModuleLogInfo } from '@/bootstrap';
import { ParameterModule } from '@/core/parameter/parameter.module';
import { controllers } from './controllers';
import { CoreModule } from '@/core/core.module';

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
    ParameterModule,
  ],
  controllers: [...controllers],
  providers: [...resolvers],
})
export class InternalModule {
  private readonly logger = new Logger(InternalModule.name);

  constructor(config: ConfigService) {
    appModuleLogInfo(config, this.logger);
  }
}
