import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ApiTimeoutInterceptor } from './shared/interceptors/api-timeout.interceptor';
import { App } from './shared/enums/app.enum';
import { OrgPublicModule } from './apps/org-public/org-public.module';
import { OrgManagementModule } from './apps/org-management/org-management.module';
import { fastify, FastifyInstance, FastifyServerOptions } from 'fastify';
import { NestFactory } from '@nestjs/core';
import { appName } from './shared/utils/app.util';
import { ConfigService } from '@nestjs/config';

export const logger = new Logger('bootstrap');

export const getApplicationModule = (): any | never => {
  switch (appName) {
    case App.OrgPublic:
      return OrgPublicModule;
    case App.OrgManagement:
      return OrgManagementModule;
    case App.Consumer:
      return OrgManagementModule;
    default:
      throw new Error(`not defined or invalid application APP_NAME=${appName}`);
  }
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
  const appGlobalPrefix = config.get<string | undefined>('APP_GLOBAL_PREFIX');

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

  // TODO add test if (process.env.SWAGGER_ENABLE=true)
  // Setup Swagger
  const swaggerPath = appGlobalPrefix ? `${appGlobalPrefix}/api` : 'api';
  setupSwagger(app, swaggerPath);
};
