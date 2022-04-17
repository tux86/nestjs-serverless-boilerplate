import { Module } from '@nestjs/common';
import { SESController } from './ses.controller';
import { SESService } from './ses.service';

@Module({
  imports: [],
  controllers: [SESController],
  providers: [SESService],
})
export class SESModule {}
