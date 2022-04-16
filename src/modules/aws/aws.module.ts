import { Module } from '@nestjs/common';
import { SesModule } from './ses/ses.module';

@Module({
  imports: [SesModule],
})
export class AwsModule {}
