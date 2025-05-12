const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body;
  let { likes } = request.body;

  if (!likes) {
    likes = 0;
  }

  const decodedUser = request.user;

  if (!decodedUser.id)
    return response
      .status(401)
      .json({ error: 'token invalid' });

  const user = await User.findById(decodedUser.id);

  if (!user)
    return response
      .status(401)
      .json({ error: 'userId missing or not valid' });

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const decodedUser = request.user;

  if (!decodedUser.id)
    return response
      .status(401)
      .json({ error: 'token invalid' });

  const blog = await Blog.findById(id);
  const user = await User.findById(decodedUser.id);

  if (!user)
    return response
      .status(401)
      .json({ error: 'userId missing or not valid' });

  if (blog.user.toString() !== decodedUser.id.toString())
    return response
      .status(401)
      .json({ error: 'token invalid' });

  const deletedBlog = await Blog.findByIdAndDelete(id);

  user.blogs = user.blogs.filter(
    (blog) => blog.toString() !== id.toString()
  );

  await user.save();

  if (!deletedBlog)
    return response
      .status(404)
      .send(`No resource find with id ${id}`);
  else return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;

  const blog = await Blog.findById(id);

  if (!blog)
    return response
      .status(404)
      .send('No resource find with that id');

  blog.likes = likes;

  const updatedBlog = await blog.save();

  return response.json(updatedBlog);
});

module.exports = blogsRouter;
