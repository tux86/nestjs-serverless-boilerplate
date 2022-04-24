import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SecretsManagerClientProvider } from './secrets-manager-client.provider';
import { GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsManagerService {
  private readonly logger = new Logger(SecretsManagerService.name);

  constructor(private readonly provider: SecretsManagerClientProvider) {}

  async getSecretValue(
    secretId: string,
  ): Promise<string | Uint8Array | undefined | never> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretId });
      const output = await this.provider.client.send(command);
      if (output.SecretString) {
        return output.SecretString;
      } else if (output.SecretBinary) {
        return output.SecretBinary;
      } else {
        return undefined;
      }
    } catch (error) {
      this.logger.error(
        `could not get secret value of SecretId("${secretId}")`,
      );
      this.logger.error(`${error} ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }
}
