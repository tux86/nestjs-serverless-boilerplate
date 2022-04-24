import { Module } from '@nestjs/common';
import { SESController } from './ses.controller';
import { SESService } from './ses.service';
import { EmailSendSuccessListener } from './listeners/email-send-success.listener';
import { EmailSendFailedListener } from './listeners/email-send-failed.listener';
import { SesMessageHandler } from './ses.message.handler';
import { SQSModule } from '../sqs/sqs.module';
import { SesClientProvider } from './ses.client.provider';
import { EmailQueueProducer } from './producers/email-queue.producer';

@Module({
  imports: [SQSModule],
  controllers: [SESController],
  providers: [
    SesClientProvider,
    SESService,
    SesMessageHandler,
    EmailSendSuccessListener,
    EmailSendFailedListener,
    EmailQueueProducer,
  ],
  exports: [SESService],
})
export class SESModule {}
