import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueName, SqsMessageHandlerMetaGenericType } from './types/sqs.types';
import { SqsConsumer } from './sqs.consumer';
import {
  SQS_MESSAGE_PROCESSED_HANDLER,
  SQS_MESSAGE_PROCESSING_ERROR_HANDLER,
  SQS_MESSAGE_RECEIVED_HANDLER,
} from './constants/message-handler.constants';
import {
  DiscoveredMethodWithMeta,
  DiscoveryService,
  MetaKey,
} from '@nestjs-plus/discovery';
import { SqsClientProvider } from './sqs-client.provider';
import {
  SqsMessageProcessedHandlerMeta,
  SqsMessageProcessingErrorHandlerMeta,
  SqsMessageReceivedHandlerMeta,
} from './interfaces/message-handler-meta.interface';

@Injectable()
export class SqsConsumersRegistry implements OnModuleInit {
  private readonly logger = new Logger(SqsConsumersRegistry.name);
  private readonly consumers = new Map<QueueName, SqsConsumer>();

  constructor(
    private readonly provider: SqsClientProvider,
    private readonly discover: DiscoveryService,
  ) {
    this.logger.debug('SqsLambdaHandler initialized');
  }

  async onModuleInit() {
    await this.registerConsumers();
  }

  async registerConsumers() {
    this.logger.debug(`initializing consumers`);
    await this.registerHandlersByMetaKey<SqsMessageReceivedHandlerMeta>(
      SQS_MESSAGE_RECEIVED_HANDLER,
    );
    await this.registerHandlersByMetaKey<SqsMessageProcessedHandlerMeta>(
      SQS_MESSAGE_PROCESSED_HANDLER,
    );
    await this.registerHandlersByMetaKey<SqsMessageProcessingErrorHandlerMeta>(
      SQS_MESSAGE_PROCESSING_ERROR_HANDLER,
    );
    this.logger.debug(`${this.consumers.size} consumer(s) has been registered`);
  }

  async registerHandlersByMetaKey<T extends SqsMessageHandlerMetaGenericType>(
    metaKey: MetaKey,
  ) {
    const handlersMetas: DiscoveredMethodWithMeta<T>[] =
      await this.discover.providerMethodsWithMetaAtKey<T>(metaKey);
    for (const eventMetadata of handlersMetas) {
      if (!eventMetadata) {
        continue;
      }
      const queueName = eventMetadata.meta.queueName;
      const discoveredMethod = eventMetadata.discoveredMethod;

      let consumer = this.consumers.get(queueName);
      if (!this.consumers.has(queueName)) {
        consumer = new SqsConsumer(queueName);
        this.consumers.set(queueName, consumer);
      }
      consumer.setHandler(
        String(metaKey),
        discoveredMethod.handler.bind(discoveredMethod.parentClass.instance),
      );
    }
  }

  public getConsumer(queueName: string): SqsConsumer | never {
    const consumer = this.consumers.get(queueName);
    if (!consumer) {
      throw new Error(`no consumer found for Queue(${queueName})`);
    }
    return consumer;
  }
}
