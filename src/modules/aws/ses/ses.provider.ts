import { ConfigService } from '@nestjs/config';
import { SqsService } from '../sqs/sqs.service';
import { SESClient } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SESProvider {
  private readonly logger = new Logger(SESProvider.name);
  public readonly client: SESClient;

  constructor(
    private readonly config: ConfigService,
    private readonly sqsService: SqsService,
  ) {
    const region = config.get('aws.region');
    this.client = new SESClient({ region });
  }
}
