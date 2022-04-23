import { Injectable, Logger } from '@nestjs/common';
import { MessageHandler, QueueName, SqsMessageHandlerMeta } from './sqs.types';
import { SQS_MESSAGE_HANDLER } from './sqs.constants';
import { SqsClientProvider } from './sqs-client.provider';
import { DiscoveryService } from '@nestjs-plus/discovery';

/**
 * A global registry of SQS message handlers.
 *
 * On module init it will automatically add methods from providers having
 * the following annotation:  @SqsMessageHandler(...)
 */
@Injectable()
export class SqsHandlersRegistry {
  private readonly registry = new Map<QueueName, MessageHandler>();
  private readonly logger = new Logger(SqsHandlersRegistry.name);

  constructor(
    private readonly provider: SqsClientProvider,
    private readonly discover: DiscoveryService,
  ) {
    this.logger.debug('SqsHandlersRegistry initialized');
  }

  async onModuleInit() {
    const messageHandlerMetaList =
      await this.discover.providerMethodsWithMetaAtKey<SqsMessageHandlerMeta>(
        SQS_MESSAGE_HANDLER,
      );

    for (const { meta, discoveredMethod } of messageHandlerMetaList) {
      const queueName = meta.queueName;
      if (this.registry.has(queueName)) {
        throw new Error(`Duplicated message handler: ${queueName}`);
      }

      const handler = discoveredMethod.handler.bind(
        discoveredMethod.parentClass.instance,
      );

      this.registry.set(queueName, handler);
      this.logger.debug(`message handler registered: ${queueName}`);
    }
  }

  /**
   * Returns message handler function by the given queue name
   * if no handler found an error will be thrown
   * @param queueName
   * @returns MessageHandler | never
   */
  public getHandler(queueName: string): MessageHandler | never {
    const messageHandler = this.registry.get(queueName);
    if (!messageHandler) {
      throw new Error(`no message handler found for queue : ${queueName}`);
    }
    return messageHandler;
  }
}
