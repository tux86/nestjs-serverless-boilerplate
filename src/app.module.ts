import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateModule } from './modules/email-template/email-template.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig } from './config';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [
    // *** ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`.env.local`, `.env.dev`],
      ignoreEnvFile: true,
      load: [appConfig, dbConfig],
    }),
    // *** TypeOrmModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      connectionFactory: async (options) => {
        console.log(options);
        const manager = getConnectionManager();
        let connection: Connection;

        if (manager.has('default')) {
          connection = manager.get('default');
        }

        /**
         * TODO: workaround only for serverless-offline mode
         * => EntityMetadataNotFoundError: No metadata for "XXX" was found.
         */
        if (
          process.env.IS_OFFLINE === 'true' &&
          connection &&
          connection.isConnected
        ) {
          await connection.close();
        }

        if (!connection?.isConnected) {
          connection = await createConnection(options);
        }

        return connection;
      },
    }),
    // *** GraphQLModule
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true, // Allow playground in production
    }),
    // *** Application modules
    HealthCheckerModule,
    OrganizationModule,
    EmailTemplateModule,
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
