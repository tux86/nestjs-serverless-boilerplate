import { Module } from '@nestjs/common';
import { SESModule } from './ses/ses.module';
import { SQSModule } from './sqs/sqs.module';

@Module({
  imports: [SESModule, SQSModule],
})
export class AwsModule {}
