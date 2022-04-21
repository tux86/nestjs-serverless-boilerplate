import { ConfigService } from '@nestjs/config';
import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SQSProvider {
  private readonly logger = new Logger(SQSProvider.name);
  public readonly client: SQSClient;
  public queueBaseUrl: string;

  constructor(private readonly config: ConfigService) {
    const region = config.get('aws.region');
    const isLocalQueueEnabled = this.config.get<boolean>('isOffline');
    const localEndpoint = config.get('aws.sqs.elasticMQEndpoint');

    //  SQS Client config
    const sqsClientConfig: SQSClientConfig = { region };

    if (isLocalQueueEnabled && !localEndpoint) {
      throw new Error(
        `Local mode is enabled. EMQ_ENDPOINT environment variable must be defined`,
      );
    }

    if (isLocalQueueEnabled) {
      // ElasticMQ queue (local)
      this.queueBaseUrl = `${localEndpoint}/queue`;
      sqsClientConfig.endpoint = localEndpoint;
      this.logger.debug(`Using local ElasticMQ endpoint ${localEndpoint}`);
    } else {
      // Amazon SQS queue
      const accountId = this.config.get('aws.accountId');
      this.queueBaseUrl = `https://sqs.${region}.amazonaws.com/${accountId}`;
    }
    this.client = new SQSClient(sqsClientConfig);
  }
}
