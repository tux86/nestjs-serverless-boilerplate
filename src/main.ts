import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { setupNestApp } from './nest.base';

const logger = new Logger('Bootstrap');

export const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await setupNestApp(app);
  const port = Number(process.env.port || 3000);
  await app.listen(port, '0.0.0.0');
  logger.log(`Application listening on port ${port}`);
};
bootstrap();
