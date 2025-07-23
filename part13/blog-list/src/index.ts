import app from './app';
import sequelize from './db';
import config from './utils/config';
import logger from './utils/logger';
import { QueryTypes } from 'sequelize';
import type { Blog } from './types';

const PORT = config.PORT ?? 3000;

const start = async () => {
  try {
    await sequelize.authenticate().then(async () => {
      const blogs: Blog[] = await sequelize.query('SELECT * FROM blogs', {
        type: QueryTypes.SELECT,
      });
      blogs.forEach((blog) => {
        logger.info(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
      });
      app.listen(PORT, () => {
        logger.info(`Server running on port http://localhost:${PORT}`);
      });
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('Unable to connect to database', error.message);
    }
  }
};

start().catch((err: unknown) => {
  logger.error('sth went wrong', err);
});
