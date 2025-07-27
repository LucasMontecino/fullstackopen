import logger from '../utils/logger';
import Blog from './Blog';
import User from './User';

Blog.sync().catch((err) => logger.error(err));
User.sync().catch((err) => logger.error(err));

export { Blog, User };
