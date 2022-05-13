import { Injectable } from '@nestjs/common';
import awsConfig from '@/config/aws.config';
import { SQSProducerAbstract } from '@/core/aws/sqs/abstracts/sqs.producer';

const EmailQueueName = awsConfig.sqs.queueNames.emailQueue;

@Injectable()
export class EmailQueueProducer extends SQSProducerAbstract {
  queueName(): string {
    return EmailQueueName;
  }
}
