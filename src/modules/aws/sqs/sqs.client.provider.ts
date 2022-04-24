import { ConfigService } from '@nestjs/config';
import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';

/**
 * Provides SQS Client instance
 *
 * depending on the configuration the provided SQS Client could
 * communicate with local broker server or AWS SQS queue
 */
@Injectable()
export class SqsClientProvider {
  public readonly client: SQSClient;
  public queueBaseUrl: string;
  private readonly logger = new Logger(SqsClientProvider.name);

  constructor(private readonly config: ConfigService) {
    const region = config.get('aws.region');
    const isLocalQueueEnabled = this.config.get<boolean>('isOffline');
    const localEndpoint = config.get('aws.sqs.localBrokerEndpoint');

    //  SQS Client config
    const sqsClientConfig: SQSClientConfig = { region };

    if (isLocalQueueEnabled && !localEndpoint) {
      throw new Error(
        `Local mode is enabled. LOCAL_BROKER_ENDPOINT environment variable must be defined`,
      );
    }

    if (isLocalQueueEnabled) {
      // Local broken queue (local)
      this.queueBaseUrl = `${localEndpoint}/queue`;
      sqsClientConfig.endpoint = localEndpoint;
      this.logger.debug(`Using local broker endpoint ${localEndpoint}`);
    } else {
      // Amazon SQS queue
      const accountId = this.config.get('aws.accountId');
      this.queueBaseUrl = `https://sqs.${region}.amazonaws.com/${accountId}`;
    }
    this.client = new SQSClient(sqsClientConfig);
  }
}
