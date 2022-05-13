import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm.config.service';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { SecretsManagerModule } from '../aws/secrets-manager/secrets-manager.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SecretsManagerModule],
      useClass: TypeOrmConfigService,
      connectionFactory: async (options) => {
        // TODO: check if this workaround is needed only for offline mode
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
  ],
})
export class DatabaseModule {}
