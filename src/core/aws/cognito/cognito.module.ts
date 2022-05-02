import { Module } from '@nestjs/common';
import { CognitoClientProvider } from './cognito-client.provider';
import { CognitoService } from './cognito.service';
import { CognitoController } from './cognito.controller';

@Module({
  imports: [],
  controllers: [CognitoController],
  providers: [CognitoClientProvider, CognitoService],
  exports: [CognitoService],
})
export class CognitoModule {}
