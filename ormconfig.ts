/**
 * this file is required for typeorm cli
 */
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './src/config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig],
});

export default dbConfig();
