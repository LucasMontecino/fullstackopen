import Blog from './Blog';
import ReadingList from './ReadingList';
import User from './User';

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readed_blogs' });
Blog.belongsToMany(User, { through: ReadingList, as: 'users_readed' });

export { Blog, User };
