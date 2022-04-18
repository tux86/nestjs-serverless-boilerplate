import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SQSController } from './sqs.controller';

@Module({
  imports: [],
  controllers: [SQSController],
  providers: [SqsService],
})
export class SQSModule {}
