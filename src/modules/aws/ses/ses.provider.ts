import { ConfigService } from '@nestjs/config';
import { SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SESProvider {
  public readonly client: SESClient;

  constructor(private readonly config: ConfigService) {
    const region = config.get('aws.region');
    this.client = new SESClient({ region });
  }
}
