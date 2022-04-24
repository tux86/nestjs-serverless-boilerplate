import { Injectable, Logger } from "@nestjs/common";
import {
  SQSMessageProcessedHandler,
  SQSMessageProcessingErrorHandler,
  SQSMessageReceivedHandler
} from "../../sqs/decorators/sqs.decorators";
import { Message } from "@aws-sdk/client-sqs";
import awsConfig from "../../../config/aws.config";
import { SESService } from "../ses.service";
import { SendEmailParameters } from "../dtos/send-email-parameters";

const EmailQueueName = awsConfig.sqs.queueNames.emailQueue;

@Injectable()
export class EmailQueueConsumer {
  private readonly logger = new Logger(EmailQueueConsumer.name);

  constructor(private readonly sesService: SESService) {
  }

  @SQSMessageReceivedHandler(EmailQueueName)
  async handleMessageReceived(message: Message) {
    this.logger.debug(`onMessageReceived`);
    const parameters: SendEmailParameters = JSON.parse(message.Body);
    await this.sesService.sendEmailSync(parameters);
  }

  @SQSMessageProcessedHandler(EmailQueueName)
  async handleMessageProcessed(message: Message) {
    this.logger.debug(`onMessageProcessed : mail sent successfully`);
  }

  @SQSMessageProcessingErrorHandler(EmailQueueName)
  async handleProcessingError(error: Error, message: Message) {
    this.logger.error(`onProcessingError: failed to send email`);
    //  this.logger.error(error.message, error.stack);
    //TODO: send message to DLQ
  }
}
