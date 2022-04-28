import { Module } from '@nestjs/common';
import { SESModule } from './ses/ses.module';
import { SQSModule } from './sqs/sqs.module';
import { SecretsManagerModule } from './secrets-manager/secrets-manager.module';
import { CognitoModule } from './cognito/cognito.module';

@Module({
  imports: [SESModule, SQSModule, SecretsManagerModule, CognitoModule],
})
export class AwsModule {}
