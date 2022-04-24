import { Module } from '@nestjs/common';
import { SecretsManagerClientProvider } from './secrets-manager-client.provider';
import { SecretsManagerService } from './secrets-manager.service';
import { SecretsManagerController } from './secrets-manager.controller';

@Module({
  imports: [],
  controllers: [SecretsManagerController],
  providers: [SecretsManagerClientProvider, SecretsManagerService],
  exports: [SecretsManagerService],
})
export class SecretsManagerModule {}
