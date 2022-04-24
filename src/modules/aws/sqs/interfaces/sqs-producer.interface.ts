/**
 * @interface SqsProducer
 */
export interface SqsProducer {
  queueUrl: string;

  queueName(): string;
}
