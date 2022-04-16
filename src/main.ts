import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './main.common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
