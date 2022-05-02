import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

/**
 * Provides S3Client instance
 */
@Injectable()
export class S3ClientProvider {
  public readonly client: S3Client;

  constructor(private readonly config: ConfigService) {
    const region = config.get('aws.region');
    this.client = new S3Client({
      apiVersion: '2006-03-01',
      // maxAttempts: 5,
      // useAccelerateEndpoint: true,
      // endpoint : '' TODO: for local s3 simulator
      region,
    });
  }
}
