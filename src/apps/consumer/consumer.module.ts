import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@/core/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Logger, Module } from '@nestjs/common';
import configuration from '@/config';
import { appModuleLogInfo } from '@/shared/utils/bootstrap.util';
import { SQSModule } from '@/core/aws/sqs/sqs.module';
import { SESModule } from '@/core/aws/ses/ses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    DatabaseModule,
    EventEmitterModule.forRoot(),
    SQSModule,
    SESModule,
  ],
  controllers: [],
  providers: [],
})
export class ConsumerModule {
  private readonly logger = new Logger(ConsumerModule.name);

  constructor(config: ConfigService) {
    appModuleLogInfo(config, this.logger);
  }
}
