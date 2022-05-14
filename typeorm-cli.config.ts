/**
 * this file is required to run typeorm cli
 */

import { NestFactory } from '@nestjs/core';
import { TypeOrmConfigService } from '@/core/database/typeorm.config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseModule } from '@/core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config';

export default (async (): Promise<TypeOrmModuleOptions> => {
  const app = await NestFactory.createApplicationContext(
    DatabaseModule.register({
      configModuleClassRef: ConfigModule.forRoot({
        isGlobal: true,
        ignoreEnvFile: true,
        cache: false,
        load: [configuration],
      }),
    }),
  );
  const typeOrmConfigService = await app.get(TypeOrmConfigService);
  const config = await typeOrmConfigService.createTypeOrmOptions();
  await app.close();
  return config;
})();
