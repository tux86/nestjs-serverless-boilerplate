import { bootstrapServer, logger } from './shared/utils/bootstrap.util';

export const bootstrap = async () => {
  const { app } = await bootstrapServer();
  const port = Number(process.env.port || 3000);
  await app.listen(port, '0.0.0.0');
  logger.log(`Application listening on port ${port}`);
};

bootstrap();
