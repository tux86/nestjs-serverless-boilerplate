import { Module } from '@nestjs/common';
import { SESModule } from '../../core/modules/aws/ses/ses.module';

@Module({
  imports: [SESModule],
  providers: [],
})
export class MailerModule {}
