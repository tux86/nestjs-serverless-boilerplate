import { Module } from '@nestjs/common';
import { SESModule } from './aws/ses/ses.module';
import { SQSModule } from './aws/sqs/sqs.module';
import { S3Module } from './aws/s3/s3.module';
import { SecretsManagerModule } from './aws/secrets-manager/secrets-manager.module';
import { CognitoModule } from './aws/cognito/cognito.module';

@Module({
  imports: [
    // AWS Modules
    SESModule,
    SQSModule,
    S3Module,
    SecretsManagerModule,
    CognitoModule,
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
