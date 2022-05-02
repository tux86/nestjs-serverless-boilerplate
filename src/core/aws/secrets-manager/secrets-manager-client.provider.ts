import { ConfigService } from '@nestjs/config';
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { Injectable } from '@nestjs/common';

/**
 * Provides AWS Secrets Manager client instance
 */
@Injectable()
export class SecretsManagerClientProvider {
  public readonly client: SecretsManagerClient;

  constructor(private readonly config: ConfigService) {
    const region = config.get('aws.region');
    this.client = new SecretsManagerClient({ region });
  }
}
