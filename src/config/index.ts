import database from './database.config';
import aws from './aws.config';
import { Environment } from '../common/enums/environment.enum';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || Environment.Development,
  isOffline: process.env.IS_OFFLINE === 'true',
  database,
  aws,
});
