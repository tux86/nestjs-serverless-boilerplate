import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SQSController } from './sqs.controller';
import { DiscoveryModule } from '@nestjs-plus/discovery';

@Module({
  imports: [DiscoveryModule],
  controllers: [SQSController],
  providers: [SqsService],
})
export class SQSModule {}
