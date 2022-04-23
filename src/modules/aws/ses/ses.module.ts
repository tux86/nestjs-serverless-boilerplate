import { Module } from '@nestjs/common';
import { SESController } from './ses.controller';
import { SESService } from './ses.service';
import { EmailSendSuccessListener } from './listeners/email-send-success.listener';
import { EmailSendFailedListener } from './listeners/email-send-failed.listener';
import { SesMessageHandler } from './ses.message.handler';
import { SQSModule } from '../sqs/sqs.module';
import { SESClientProvider } from './ses-client.provider';

@Module({
  imports: [SQSModule],
  controllers: [SESController],
  providers: [
    SESClientProvider,
    SESService,
    SesMessageHandler,
    EmailSendSuccessListener,
    EmailSendFailedListener,
  ],
  exports: [SESService],
})
export class SESModule {}
