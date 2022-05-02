import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

/**
 * Provides CognitoIdentityProviderClient instance
 */
@Injectable()
export class CognitoClientProvider {
  public readonly client: CognitoIdentityProviderClient;

  constructor(private readonly config: ConfigService) {
    const region = config.get('aws.region');
    this.client = new CognitoIdentityProviderClient({
      region,
    });
  }
}
