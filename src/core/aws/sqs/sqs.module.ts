import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { SqsClientProvider } from './sqs-client.provider';
import { SqsLambdaHandler } from './sqs.lambda.handler';
import { SqsConsumersRegistry } from './sqs.consumers.registry';

@Module({
  imports: [DiscoveryModule],
  controllers: [],
  providers: [
    SqsClientProvider,
    SqsService,
    SqsConsumersRegistry,
    SqsLambdaHandler,
  ],
  exports: [SqsService],
})
export class SQSModule {}
