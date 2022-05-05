import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config';
import { MailerModule } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '../core/database/database.module';
import { UserModule } from './user/user.module';
import { CoreModule } from '../core/core.module';
import { Organization } from './organization/organization.entity';
import { EmailTemplateModule } from './email-template/email-template.module';
import { AppController } from './app.controller';
import { GraphqlManagementApiModule } from './graphql/graphql-management-api/graphql-management-api.module';
import { GraphqlPublicApiModule } from './graphql/graphql-public-api/graphql-public-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    GraphqlManagementApiModule,
    GraphqlPublicApiModule,
    // *** EventEmitterModule ***
    EventEmitterModule.forRoot(),
    // *** CoreModule ***
    CoreModule,
    // *** Application app ***
    AuthModule,
    Organization,
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
    this.logger.log('_________________________-');
    this.logger.log(`NODE_ENV=${process.env.NODE_ENV}`);
    this.logger.log(`STAGE=${process.env.STAGE}`);
    this.logger.log('_________________________-');
  }
}
