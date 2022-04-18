import { Module } from '@nestjs/common';
import { SESController } from './ses.controller';
import { SESService } from './ses.service';
import { EmailSendSuccessListener } from './listeners/email-send-success.listener';
import { EmailSendFailedListener } from './listeners/email-send-failed.listener';

@Module({
  imports: [],
  controllers: [SESController],
  providers: [SESService, EmailSendSuccessListener, EmailSendFailedListener],
})
export class SESModule {}
