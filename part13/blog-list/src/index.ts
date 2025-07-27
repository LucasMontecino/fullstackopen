import app from './app';
import { connectToDB } from './utils/db';
import config from './utils/config';
import logger from './utils/logger';

const PORT = config.PORT ?? 3000;

const start = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    logger.info(`Server running on port http://localhost:${PORT}`);
  });
};

start().catch((err: unknown) => {
  logger.error('sth went wrong', err);
});
