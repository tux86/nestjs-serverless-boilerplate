import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config';
import { DatabaseModule } from '@/core/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
      cache: true,
    }),
    DatabaseModule.register(),
    EventEmitterModule.forRoot(),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
