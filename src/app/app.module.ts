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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { UserGraphqlOrgMgmtModule } from './user/graphql/org-mgmt/user-graphql-org-mgmt.module';
import { UserGraphqlPublicModule } from './user/graphql/public/user-graphql-public.module';
import { createApolloDriverConfig } from '../shared/utils/graphql-driver-config.util';
import { ApiName } from '../shared/enums/graphql.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    // graphql management api module
    GraphQLModule.forRoot<ApolloDriverConfig>(
      createApolloDriverConfig(ApiName.OrgMgmt, [UserGraphqlOrgMgmtModule]),
    ),
    // graphql public api module
    GraphQLModule.forRoot<ApolloDriverConfig>(
      createApolloDriverConfig(ApiName.Public, [UserGraphqlPublicModule]),
    ),
    // *** EventEmitterModule ***
    EventEmitterModule.forRoot(),
    // *** CoreModule ***
    CoreModule,
    // *** Application app ***
    AuthModule,
    Organization,
    UserModule,
    // EmailTemplateModule,
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
