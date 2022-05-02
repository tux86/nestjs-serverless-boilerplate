import { EmailSendFailedEvent } from '../events/email-send-failed.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSendFailedListener {
  @OnEvent('email.send.failed')
  handleEmailSendFailed(event: EmailSendFailedEvent) {
    console.error('error sending while sending email');
  }
}
