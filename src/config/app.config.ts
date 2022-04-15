import { Environment, isEnvironment } from './environment';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  isProduction: isEnvironment(Environment.PRODUCTION),
}));
