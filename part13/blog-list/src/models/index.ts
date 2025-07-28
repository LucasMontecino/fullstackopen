import logger from '../utils/logger';
import Blog from './Blog';
import User from './User';

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.sync({ alter: true }).catch((err) => logger.error(err));
User.sync({ alter: true }).catch((err) => logger.error(err));

export { Blog, User };
