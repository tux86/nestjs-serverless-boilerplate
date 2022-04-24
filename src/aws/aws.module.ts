import { Module } from '@nestjs/common';
import { SESModule } from './ses/ses.module';
import { SQSModule } from './sqs/sqs.module';
import { SecretsManagerModule } from './secrets-manager/secrets-manager.module';

@Module({
  imports: [SESModule, SQSModule, SecretsManagerModule],
})
export class AwsModule {}
