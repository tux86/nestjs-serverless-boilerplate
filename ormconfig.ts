/**
 * this file is required to run typeorm cli
 */
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './src/config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig],
});

export default dbConfig();
