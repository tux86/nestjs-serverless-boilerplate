import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../core/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { isEnv } from '../../shared/utils/env.util';
import { Env } from '../../shared/enums/env.enum';
import { OrganizationModule } from '../../core/organization/organization.module';
import { CoreModule } from '../../core/core.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import configuration from '../../config';
import { OrganizationResolver } from './resolvers/organization.resolver';
import { appGlobalPrefix } from '../../shared/utils/app.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // generated on-the-fly in memory (needed for lambda)
      path: `${appGlobalPrefix}/graphql`,
      disableHealthCheck: true,
      sortSchema: true,
      debug: false,
      introspection: !isEnv(Env.Prod),
      playground: true,
      //TODO: disable plugin on production
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        delete error.extensions?.code;
        return error;
      },
    }),
    // *** EventEmitterModule ***
    EventEmitterModule.forRoot(),
    // *** CoreModule ***
    CoreModule,
    // *** Application apps ***
    OrganizationModule,
  ],
  controllers: [],
  providers: [OrganizationResolver],
})
export class OrgManagementModule {
  private readonly logger = new Logger(OrgManagementModule.name);

  constructor() {
    this.logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
    this.logger.debug(`  NODE_ENV         → ${process.env.NODE_ENV}`);
    this.logger.debug(`  SERVERLESS STAGE → ${process.env.STAGE}`);
    this.logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
  }
}