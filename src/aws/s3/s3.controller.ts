import { Controller, Get, Post } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';
import { streamToString } from './utils/s3.stream.utils';
import { Readable } from 'stream';
import { nanoid } from 'nanoid';

@Controller('aws/s3')
export class S3Controller {
  constructor(
    private readonly config: ConfigService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('/putObject')
  async putObject(): Promise<any> {
    try {
      const result = await this.s3Service.putObject({
        Key: 'test.txt',
        Body: 'hello world',
      });

      return {
        success: result,
      };
    } catch (error) {
      return error;
    }
  }

  @Get('getObject')
  async getObject(): Promise<any> {
    try {
      const result = await this.s3Service.getObject({
        Key: 'test.txt',
      });

      const content = streamToString(result.Body as Readable);
      return content;
    } catch (error) {
      return error;
    }
  }

  @Get('/createPreSignedGetUrl')
  async createPreSignedGetUrl(): Promise<any> {
    try {
      return await this.s3Service.createPreSignedGetUrl(
        'uploads/73cad09a61-wal-idandx-t-Karray.png',
        300,
      );
    } catch (error) {
      return error;
    }
  }

  @Get('/createPreSignedPostUrl')
  async createPreSignedPostUrl(): Promise<any> {
    try {
      const data = await this.s3Service.createPreSignedPostUrl('walid.png');

      return data;
    } catch (error) {
      return error;
    }
  }

  @Get('/createPreSignedPutUrl')
  async createPreSignedPutUrl(): Promise<any> {
    try {
      const signedUploadUrl = await this.s3Service.createPreSignedPutUrl({
        key: 'uploads/wal id.!?:#&x-t ~Karray.png',
        expiresIn: 3600,
        metadata: {
          'target-processor': 'media-processor',
          'org-id': 'ORG-001',
          'import-file-id': nanoid(),
        },
      });

      return {
        signedUploadUrl,
      };
    } catch (error) {
      return error;
    }
  }
}
