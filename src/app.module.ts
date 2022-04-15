import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateModule } from './email-template/email-template.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './config';
import { Connection, createConnection, getConnectionManager } from 'typeorm';

@Module({
  imports: [
    // *** ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      load: [database],
    }),
    // *** TypeOrmModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      connectionFactory: async (options) => {
        const manager = getConnectionManager();
        let connection: Connection;

        if (manager.has('default')) {
          connection = manager.get('default');
        }
        if (
          process.env.SERVERLESS_OFFLINE_MODE === 'true' &&
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
    EmailTemplateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
