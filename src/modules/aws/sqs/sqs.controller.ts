import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsService } from './sqs.service';

@Controller('aws/sqs')
export class SQSController {
  constructor(
    private config: ConfigService,
    private readonly sqsService: SqsService,
  ) {}

  @Get('testSendMessage')
  async sendEmailTest(): Promise<void> {
    //const queueName = this.config.get('aws.sqs.emailQueue.name');
    // console.log('=============  queueName=', queueName);
    await this.sqsService.send('nestjs-serverless-poc-EmailQueue-dev', {
      body: JSON.stringify({
        content: 'my message content ' + Math.random(),
      }),
    });
  }
}
