import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretsManagerService } from './secrets-manager.service';

@Controller('aws/secrets-manager')
export class SecretsManagerController {
  constructor(
    private config: ConfigService,
    private service: SecretsManagerService,
  ) {}

  @Get('test')
  async testGetSecretValue() {
    const data = await this.service.getSecretValue('test_secret');
    return {
      data,
    };
  }
}
