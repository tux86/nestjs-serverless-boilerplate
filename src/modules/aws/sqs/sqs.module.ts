import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SQSController } from './sqs.controller';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { SqsConsumer } from './sqs.consumer';

@Module({
  imports: [DiscoveryModule],
  controllers: [SQSController],
  providers: [SqsService, SqsConsumer],
})
export class SQSModule {}
