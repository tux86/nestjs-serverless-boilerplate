import { Logger, Module } from '@nestjs/common';
import { EmailTemplateModule } from './email-template/email-template.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { HealthCheckerModule } from './health-checker/health-checker.module';
import { MailerModule } from './mailer/mailer.module';
import { AwsModule } from './aws/aws.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from './database/database.module';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { UserModule } from './user/user.module';

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
    // *** EventEmitterModule
    EventEmitterModule.forRoot(),
    // *** Application modules
    HealthCheckerModule,
    AuthModule,
    AwsModule,
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
