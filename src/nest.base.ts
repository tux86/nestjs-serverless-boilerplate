import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ApiTimeoutInterceptor } from './shared/interceptors/api-timeout.interceptor';

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

export const setupNestApp = async (app: NestFastifyApplication) => {
  // app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ApiTimeoutInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Setup Swagger
  setupSwagger(app);
};
