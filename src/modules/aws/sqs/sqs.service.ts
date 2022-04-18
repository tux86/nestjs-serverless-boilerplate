import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SendMessageCommand,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { SendMessageInput } from './dtos/send-message.input';

@Injectable()
export class SqsService {
  private readonly client: SQSClient;
  private readonly logger = new Logger(SqsService.name);

  constructor(private config: ConfigService) {
    const region = config.get('aws.region');
    const elasticMQEndpoint = config.get('aws.sqs.elasticMQEndpoint');

    const clientConfig: SQSClientConfig = { region };

    // set endpoint if ElasticMQ endpoint provided (offline mode)
    if (elasticMQEndpoint) {
      clientConfig.endpoint = elasticMQEndpoint;
      this.logger.debug(`ElasticMQ endpoint ${elasticMQEndpoint}`);
    }

    this.client = new SQSClient(clientConfig);
    this.logger.debug('sqs service initialized');
  }

  public async send(queueName: string, input: SendMessageInput): Promise<void> {
    const { body, groupId, deduplicationId, delaySeconds, messageAttributes } =
      input;
    const command = new SendMessageCommand({
      QueueUrl: `http://0.0.0.0:9324/queue/${queueName}`,
      MessageGroupId: groupId,
      DelaySeconds: delaySeconds,
      MessageDeduplicationId: deduplicationId,
      MessageSystemAttributes: messageAttributes,
      MessageBody: body,
      MessageAttributes: messageAttributes,
    });
    await this.client.send(command);
  }

  public async purgeQueue(queueName: string): Promise<void> {
    return;
  }
}
