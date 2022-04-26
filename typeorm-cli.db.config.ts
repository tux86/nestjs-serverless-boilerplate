/**
 * this file is required to run typeorm cli
 */

import { NestFactory } from '@nestjs/core';
import { TypeOrmConfigService } from './src/database/typeorm.config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppModule } from './src/app.module';

export default (async (): Promise<TypeOrmModuleOptions> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const typeOrmConfigService = await app.get(TypeOrmConfigService);
  const config = await typeOrmConfigService.createTypeOrmOptions();
  await app.close();
  return config;
})();
