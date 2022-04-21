import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { SqsConsumer } from './sqs.consumer';

@Module({
  imports: [DiscoveryModule],
  controllers: [],
  providers: [SqsService, SqsConsumer],
  exports: [SqsService],
})
export class SQSModule {}
