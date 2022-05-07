import database from './database.config';
import aws from './aws.config';
import { Env } from '../shared/enums/env.enum';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || Env.Dev,
  isOffline: process.env.IS_OFFLINE === 'true',
  database,
  aws,
});
