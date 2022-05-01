import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3ClientProvider } from './s3-client.provider';
import { GetObjectInput, GetObjectResponse, PutObjectInput } from './s3.types';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetUploadUrlInput } from './dtos/get-upload-url.input';
import slugify from 'slugify';
import path from 'path';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  constructor(
    private readonly config: ConfigService,
    private readonly s3ClientProvider: S3ClientProvider,
  ) {
    this.s3Client = this.s3ClientProvider.client;
    this.logger.debug('CognitoService initialized');
  }

  public async getObject(
    getObject: GetObjectInput,
  ): Promise<GetObjectResponse | never> {
    const command = new GetObjectCommand(getObject);
    return await this.s3Client.send(command);
  }

  public async putObject(putObject: PutObjectInput): Promise<boolean | never> {
    const command = new PutObjectCommand(putObject);
    const response = await this.s3Client.send(command);
    return response.$metadata.httpStatusCode === HttpStatus.OK;
  }

  public async getUploadUrl(input: GetUploadUrlInput): Promise<string | never> {
    const { bucketName, baseDir, fileName, contentType, expiresIn, metadata } =
      input;

    // slugify file name
    const fileNameSlug = slugify(fileName, {
      strict: false,
      trim: true,
      lower: false,
    });

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: path.join(baseDir, fileNameSlug),
      ContentType: contentType,
      Metadata: {
        'original-file-name': fileName,
        ...metadata,
      },
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
