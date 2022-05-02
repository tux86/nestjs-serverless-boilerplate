import { Logger, Module } from '@nestjs/common';
import { EmailTemplateModule } from './email-template/email-template.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config';
import { HealthCheckerModule } from '../core/modules/health-checker/health-checker.module';
import { MailerModule } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '../core/modules/database/database.module';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { UserModule } from './user/user.module';
import { CognitoModule } from '../core/modules/aws/cognito/cognito.module';
import { SESModule } from '../core/modules/aws/ses/ses.module';
import { SQSModule } from '../core/modules/aws/sqs/sqs.module';
import { S3Module } from '../core/modules/aws/s3/s3.module';
import { SecretsManagerModule } from '../core/modules/aws/secrets-manager/secrets-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: true,
      cache: false,
      subscription: false,
      graphiql: true,
    }),
    // *** EventEmitterModule ***
    EventEmitterModule.forRoot(),
    // *** START: AWS Modules ***
    SESModule,
    SQSModule,
    S3Module,
    SecretsManagerModule,
    CognitoModule,
    // *** END: AWS Modules ***
    // *** Application app ***
    HealthCheckerModule,
    AuthModule,
    UserModule,
    EmailTemplateModule,
    MailerModule,
  ],
  controllers: [],
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
