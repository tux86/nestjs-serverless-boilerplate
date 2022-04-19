import database from './database.config';
import aws from './aws.config';
import { Environment } from '../common/utils/environment';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || Environment.Development,
  isOffline: process.env.IS_OFFLINE === 'true',
  defaultFromEmail: process.env.DEFAULT_FROM_MAIL,
  database,
  aws,
});
