import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplate } from './email-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplate])],
})
export class EmailModule {}
