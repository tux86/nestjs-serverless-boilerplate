import { Injectable, Logger } from '@nestjs/common';
import { SendEmailParameters } from './dtos/send-email-parameters';
import { SqsService } from '../sqs/sqs.service';
import awsConfig from '../../../config/aws.config';
import { SESClientProvider } from './ses-client.provider';

const EmailQueueName = awsConfig.sqs.queueNames.emailQueue;

@Injectable()
export class SESService {
  private readonly logger = new Logger(SESService.name);

  constructor(
    private readonly sesClientProvider: SESClientProvider,
    private readonly sqsService: SqsService,
  ) {
    this.logger.debug('SES Client initialized');
  }

  /**
   * send email asynchronous (sqs queue)
   * @param input
   */
  public async sendEmail(input: SendEmailParameters): Promise<void> {
    await this.sqsService.send(EmailQueueName, {
      body: JSON.stringify(input),
    });
  }

  /**
   * send email synchronous (ses)
   * @param input
   */
  public async sendEmailSync(input: SendEmailParameters): Promise<void> {
    try {
      const result = await this.sesClientProvider.client.sendMail(input);
    } catch (error) {
      this.logger.error('failed to send email');
      this.logger.error(error, JSON.stringify(error));
    }
  }
}
