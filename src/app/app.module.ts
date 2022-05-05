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
import { join } from 'path';
import { isEnvironment } from '../shared/utils/environment.util';
import { Environment } from '../shared/enums/environment.enum';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

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
      autoSchemaFile: join(process.cwd(), `src/app/schema.gql`),
      disableHealthCheck: true,
      sortSchema: true,
      debug: false,
      introspection: !isEnvironment(Environment.Production),
      playground: false,
      //TODO: disable plugin on production
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
