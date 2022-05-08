import { Module } from '@nestjs/common';
import { SESModule } from '../aws/ses/ses.module';

@Module({
  imports: [SESModule],
  providers: [],
})
export class MailerModule {}
