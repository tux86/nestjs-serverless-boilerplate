import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  secretArn: process.env.DATABASE_SECRET_ARN,
  name: process.env.DATABASE_NAME,
  useUTC: true,
} as PostgresConnectionOptions;
