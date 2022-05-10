import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';
import { ApiTimeoutInterceptor } from '../interceptors/api-timeout.interceptor';
import { App } from '../enums/app.enum';
import { PublicModule } from '../../apps/public/public.module';
import { ManagementModule } from '../../apps/management/management.module';
import { fastify, FastifyInstance, FastifyServerOptions } from 'fastify';
import { NestFactory } from '@nestjs/core';
import { appName } from './app.util';
import { ConfigService } from '@nestjs/config';
import { InternalModule } from '../../apps/internal/internal.module';

export const logger = new Logger('bootstrap');

export const getApplicationModule = (): any | never => {
  switch (appName) {
    case App.Public:
      return PublicModule;
    case App.Management:
      return ManagementModule;
    case App.Internal:
      return InternalModule;
    case App.Consumer:
      return ManagementModule;
    default:
      throw new Error(`not defined or invalid application APP_NAME=${appName}`);
  }
};

export const appModuleLogInfo = (config: ConfigService, logger: Logger) => {
  // logger.debug(JSON.stringify(config, null, 2));
  logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
  logger.debug(`  APP_NAME         → ${config.get('appName')}`);
  logger.debug(`  NODE_ENV         → ${config.get('env')}`);
  logger.debug(`  STAGE            → ${config.get('stage')}`);
  logger.debug('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
};

export interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

export const bootstrapServer = async (): Promise<NestApp> => {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    getApplicationModule(),
    new FastifyAdapter(instance),
    { logger: !process.env.AWS_EXECUTION_ENV ? new Logger() : console },
  );

  await setupNestApp(app);
  await app.init();
  return { app, instance };
};

// Swagger
export const setupSwagger = (app: INestApplication, path: string) => {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('beta')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document);
};

export const setupNestApp = async (app: NestFastifyApplication) => {
  const config = app.get(ConfigService);
  const appGlobalPrefix = config.get<string | undefined>('appGlobalPrefix');
  const enableSwagger = config.get<boolean>('enableSwagger');

  // apps.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ApiTimeoutInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  if (appGlobalPrefix) {
    app.setGlobalPrefix(appGlobalPrefix);
  }

  // Setup Swagger
  if (enableSwagger) {
    const swaggerPath = appGlobalPrefix ? `${appGlobalPrefix}/api` : 'api';
    setupSwagger(app, swaggerPath);
  }
};
