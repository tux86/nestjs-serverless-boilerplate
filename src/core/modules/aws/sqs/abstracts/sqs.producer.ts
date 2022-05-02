import { SqsService } from '../sqs.service';
import { SendMessageInput } from '../dtos/send-message.input';
import { Inject, Logger } from '@nestjs/common';
import { SqsProducer } from '../interfaces/sqs-producer.interface';

/**
 * @abstract SQSProducerAbstract
 */
export abstract class SQSProducerAbstract implements SqsProducer {
  public queueUrl: string;
  protected readonly logger = new Logger(SQSProducerAbstract.name);

  public constructor(@Inject(SqsService) readonly sqsService: SqsService) {
    this.queueUrl = [
      this.sqsService.provider.queueBaseUrl,
      this.queueName(),
    ].join('/');
  }

  public abstract queueName(): string;

  /**
   *  send message to consumer sqs queue
   * @param queueName
   * @param input
   */
  public async send<T = any>(input: SendMessageInput): Promise<void> {
    await this.sqsService.send<T>(this.queueUrl, input);
  }
}
