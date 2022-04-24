import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';

// Swagger

















export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('beta')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

// initialize nest application
async function initNestApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  // Swagger
  setupSwagger(app);
  return app;
}

// default nest bootstrap
export async function defaultBootstrap(): Promise<void> {
  const logger = new Logger(NestApplication.name);
  const app = await initNestApp();
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

//  bootstrap for lambda http handler
export async function serverlessBootstrap(): Promise<Handler> {
  const app = await initNestApp();
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
