import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './main.common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
const logger = new Logger(NestApplication.name);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // Swagger
  setupSwagger(app);

  const port = configService.get<number>('port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
