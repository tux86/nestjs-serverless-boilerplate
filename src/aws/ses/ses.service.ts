import { Injectable, Logger } from '@nestjs/common';
import { SendEmailParameters } from './dtos/send-email-parameters';
import { SesClientProvider } from './ses-client.provider';
import { MessageId } from './types/ses.types';
import { EmailQueueProducer } from './producers/email-queue.producer';

@Injectable()
export class SESService {
  private readonly logger = new Logger(SESService.name);

  constructor(
    private readonly sesClientProvider: SesClientProvider,
    private readonly producer: EmailQueueProducer,
  ) {
    this.logger.debug('SES Client initialized');
  }

  /**
   * send email asynchronous (sqs queue)
   * @param input
   */
  public async sendEmail(input: SendEmailParameters): Promise<void> {
    await this.producer.send({
      body: input,
    });
  }

  /**
   * send email synchronous (ses)
   * @param input
   */
  public async sendEmailSync(input: SendEmailParameters): Promise<MessageId> {
    const result = await this.sesClientProvider.client.sendMail(input);
    return result.messageId;
  }
}
