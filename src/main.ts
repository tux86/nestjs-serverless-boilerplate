import { bootstrapServer, logger } from '@/bootstrap';

export const bootstrap = async (): Promise<void> => {
  const { app } = await bootstrapServer();
  const port = Number(process.env.port || 3000);
  await app.listen(port, '0.0.0.0');
  logger.log(`Application listening on port ${port}`);
};

void bootstrap();
