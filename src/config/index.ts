import database from './database.config';
import aws from './aws.config';
import { Env } from '@/shared/enums/env.enum';

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || Env.Dev,
  stage: process.env.STAGE,
  isOffline: process.env.IS_OFFLINE === 'true',
  appName: process.env.APP_NAME || undefined,
  appGlobalPrefix: process.env.APP_GLOBAL_PREFIX || undefined,
  enableSwagger: process.env.ENABLE_SWAGGER || false,
  database,
  aws,
};

export default (): any => config;
