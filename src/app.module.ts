import { Logger, Module } from '@nestjs/common';
import { EmailTemplateModule } from './email-template/email-template.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { HealthCheckerModule } from './health-checker/health-checker.module';
import { MailerModule } from './mailer/mailer.module';
import { AwsModule } from './aws/aws.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true, // Allow playground in production
    }),
    // *** EventEmitterModule
    EventEmitterModule.forRoot(),
    // *** Application modules
    HealthCheckerModule,
    AuthModule,
    AwsModule,
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
