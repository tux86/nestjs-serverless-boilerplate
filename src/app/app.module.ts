import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config';
import { MailerModule } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '../core/database/database.module';
import { CoreModule } from '../core/core.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { isEnv } from '../shared/utils/environment.util';
import { Env } from '../shared/enums/env.enum';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { GraphQLError } from 'graphql';

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
      disableHealthCheck: true,
      sortSchema: true,
      debug: false,
      introspection: !isEnv(Env.Prod),
      playground: false,
      //TODO: disable plugin on production
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        delete error.extensions?.code;
        return error;
      },
    }),
    // *** EventEmitterModule ***
    EventEmitterModule.forRoot(),
    // *** CoreModule ***
    CoreModule,
    // *** Application app ***
    AuthModule,
    OrganizationModule,
    UserModule,
    EmailTemplateModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
    this.logger.debug(`  NODE_ENV         → ${process.env.NODE_ENV}`);
    this.logger.debug(`  SERVERLESS STAGE → ${process.env.STAGE}`);
    this.logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
  }
}
