import { Module } from '@nestjs/common';
import { S3ClientProvider } from './s3-client.provider';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';

@Module({
  imports: [],
  controllers: [S3Controller],
  providers: [S3ClientProvider, S3Service],
  exports: [S3Service],
})
export class S3Module {}
