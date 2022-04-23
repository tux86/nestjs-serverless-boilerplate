import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { SqsConsumer } from './sqs.consumer';
import { SqsClientProvider } from './sqs-client.provider';
import { SqsHandlersRegistry } from './sqs-handlers-registry';

@Module({
  imports: [DiscoveryModule],
  controllers: [],
  providers: [SqsClientProvider, SqsService, SqsHandlersRegistry, SqsConsumer],
  exports: [SqsService],
})
export class SQSModule {}
