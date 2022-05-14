import { ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { appModuleLogInfo } from '@/bootstrap';
import { SQSModule } from '@/core/aws/sqs/sqs.module';
import { SESModule } from '@/core/aws/ses/ses.module';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule, SQSModule, SESModule],
  controllers: [],
  providers: [],
})
export class ConsumerModule {
  private readonly logger = new Logger(ConsumerModule.name);

  constructor(config: ConfigService) {
    appModuleLogInfo(config, this.logger);
  }
}
