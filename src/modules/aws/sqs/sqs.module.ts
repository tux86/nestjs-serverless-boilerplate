import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { SqsConsumer } from './sqs.consumer';
import { SQSProvider } from './sqs.provider';

@Module({
  imports: [DiscoveryModule],
  controllers: [],
  providers: [SQSProvider, SqsService, SqsConsumer],
  exports: [SqsService],
})
export class SQSModule {}
