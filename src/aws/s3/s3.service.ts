import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3ClientProvider } from './s3-client.provider';
import { GetObjectInput, GetObjectResponse, PutObjectInput } from './s3.types';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);

  constructor(
    private readonly config: ConfigService,
    private readonly s3ClientProvider: S3ClientProvider,
  ) {
    this.logger.debug('CognitoService initialized');
  }

  public async getObject(
    getObject: GetObjectInput,
  ): Promise<GetObjectResponse | never> {
    const command = new GetObjectCommand(getObject);
    return await this.s3ClientProvider.client.send(command);
  }

  public async putObject(putObject: PutObjectInput): Promise<boolean | never> {
    const command = new PutObjectCommand(putObject);
    const response = await this.s3ClientProvider.client.send(command);
    return response.$metadata.httpStatusCode === HttpStatus.OK;
  }
}
