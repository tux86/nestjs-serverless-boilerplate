import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../core/database/database.module';
import { CoreModule } from '../../core/core.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import configuration from '../../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    // *** EventEmitterModule ***
    EventEmitterModule.forRoot(),
    // *** CoreModule ***
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class ConsumerModule {
  private readonly logger = new Logger(ConsumerModule.name);

  constructor() {
    this.logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
    this.logger.debug(`  NODE_ENV         → ${process.env.NODE_ENV}`);
    this.logger.debug(`  SERVERLESS STAGE → ${process.env.STAGE}`);
    this.logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
  }
}
