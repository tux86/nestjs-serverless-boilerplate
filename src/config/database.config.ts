import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'database',
  () =>
    ({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      // migrationsTableName: 'migrations',
      // migrationsTransactionMode: 'each',
      autoLoadEntities: false,
      keepConnectionAlive: false,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      namingStrategy: new SnakeNamingStrategy(),
      useUTC: true,
    } as PostgresConnectionOptions),
);
