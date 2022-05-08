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
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { CreatePreSignedPutUrlInput } from './dtos/get-upload-url.input';
import slugify from 'slugify';
import path from 'path';
import mime from 'mime';
import { PresignedPost } from '@aws-sdk/s3-presigned-post/dist-types/createPresignedPost';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly config: ConfigService,
    private readonly s3ClientProvider: S3ClientProvider,
  ) {
    this.s3Client = this.s3ClientProvider.client;
    this.bucketName = this.config.get('aws.s3.bucketName');
    this.logger.debug('CognitoService initialized');
  }

  public async getObject(
    getObject: GetObjectInput,
  ): Promise<GetObjectResponse | never> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      ...getObject,
    });
    return await this.s3Client.send(command);
  }

  public async putObject(putObject: PutObjectInput): Promise<boolean | never> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      ...putObject,
    });
    const response = await this.s3Client.send(command);
    return response.$metadata.httpStatusCode === HttpStatus.OK;
  }

  public async createPreSignedGetUrl(
    key: string,
    expiresIn: number,
  ): Promise<string | never> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }

  public async createPreSignedPostUrl(
    key: string,
    maxSize?: number,
    expiryTimeInSeconds?: number,
  ): Promise<PresignedPost | never> {
    return await createPresignedPost(this.s3Client, {
      Bucket: this.bucketName,
      Key: key,
      Conditions: [
        // content length restrictions: 0-5MB]
        ['content-length-range', 0, 5000000],
        // specify content-type to be more generic - images only
        // ['starts-with', '$Content-Type', 'image/'],
        // ['eq', '$Content-Type', fileType],
        // ['starts-with', '$key', identityId],
      ],
      // Fields: {
      //   'Content-Type': mimeType,
      // },
      Expires: 3600, //Seconds before the presigned post expires. 3600 by default.
    });
  }

  /**
   * Generate pre-signed "PUT" url to upload files to S3
   * @param input
   */
  public async createPreSignedPutUrl(
    input: CreatePreSignedPutUrlInput,
  ): Promise<string | never> {
    const { key, expiresIn, metadata } = input;

    const extension = path.extname(key);
    const mimeType = mime.lookup(extension, 'application/octet-stream');
    const originalFileName = path.basename(key);
    const baseDir = key.substring(0, key.indexOf(originalFileName));
    const originalFileNameWithoutExt = path.basename(
      originalFileName,
      extension,
    );

    const slug = slugify(originalFileNameWithoutExt, {
      strict: true,
      trim: true,
      lower: false,
    });

    const randomPrefix = nanoid(10);
    const uploadedName = [randomPrefix, '-', slug, extension].join('');

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: path.join(baseDir, uploadedName),
      ContentType: mimeType,
      Metadata: {
        'original-file-name': originalFileName,
        ...metadata,
      },
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
