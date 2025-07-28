import { QueryTypes, Sequelize } from 'sequelize';
import config from './config';
import logger from './logger';
import { Blog } from '../types/types';

export const sequelize = new Sequelize(config.DATABASE_URL);

export const connectToDB = async () => {
  try {
    await sequelize.authenticate().then(async () => {
      const blogs: Blog[] = await sequelize.query('SELECT * FROM blogs', {
        type: QueryTypes.SELECT,
      });
      blogs.forEach((blog) => {
        logger.info(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
      });
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('fail to connect to db');
      process.exit(1);
    }
  }
};
