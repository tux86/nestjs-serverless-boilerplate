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
    const bucketName = this.config.get('aws.s3.bucketName');

    try {
      const result = await this.s3Service.putObject({
        Bucket: bucketName,
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
    const bucketName = this.config.get('aws.s3.bucketName');

    try {
      const result = await this.s3Service.getObject({
        Bucket: bucketName,
        Key: 'test.txt',
      });

      const content = streamToString(result.Body as Readable);
      return content;
    } catch (error) {
      return error;
    }
  }

  @Get('/getUploadSignedUrl')
  async getUploadSignedUrl(): Promise<any> {
    const bucketName = this.config.get('aws.s3.bucketName');

    try {
      const signedUploadUrl = await this.s3Service.getUploadUrl({
        bucketName,
        baseDir: 'uploads',
        fileName: 'wal id.x-t ~Karray.png',
        contentType: 'image/png',
        expiresIn: 3600,
        metadata: {
          'handler-name': 'importer',
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
