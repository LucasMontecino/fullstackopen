import Blog from './Blog';
import User from './User';

User.hasMany(Blog);
Blog.belongsTo(User);

export { Blog, User };
