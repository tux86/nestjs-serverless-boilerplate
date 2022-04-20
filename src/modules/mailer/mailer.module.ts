import { Module } from '@nestjs/common';
import { MailerConsumer } from './mailer.consumer';

@Module({
  providers: [MailerConsumer],
})
export class MailerModule {}
