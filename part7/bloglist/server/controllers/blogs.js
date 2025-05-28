const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', {
      content: 1,
    });
  return response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id)
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', {
      content: 1,
    });
  return response.json(blog);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url } = request.body;
  let { likes } = request.body;

  if (!likes) {
    likes = 0;
  }

  const decodedUser = request.user;

  if (!decodedUser.id)
    return response.status(401).json({ error: 'token invalid' });

  const user = await User.findById(decodedUser.id);

  if (!user)
    return response.status(401).json({ error: 'userId missing or not valid' });

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

  return response.status(201).json({
    id: savedBlog._id.toString(),
    title: savedBlog.title,
    author: savedBlog.author,
    url: savedBlog.url,
    likes: savedBlog.likes,
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
    },
  });
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const { id } = request.params;

    const decodedUser = request.user;

    if (!decodedUser.id)
      return response.status(401).json({ error: 'token invalid' });

    const blog = await Blog.findById(id);
    const user = await User.findById(decodedUser.id);

    if (!user)
      return response
        .status(401)
        .json({ error: 'userId missing or not valid' });

    if (blog.user.toString() !== decodedUser.id.toString())
      return response.status(401).json({ error: 'token invalid' });

    const deletedBlog = await Blog.findByIdAndDelete(id);

    user.blogs = user.blogs.filter((blog) => blog.toString() !== id.toString());

    await user.save();

    if (!deletedBlog)
      return response.status(404).send(`No resource find with id ${id}`);
    else return response.status(204).end();
  }
);

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { id } = request.params;

  const decodedUser = request.user;

  if (!decodedUser.id)
    return response.status(401).json({ error: 'token invalid' });

  const blog = await Blog.findById(id);
  if (!blog)
    return response.status(404).json({ error: 'blogId missing or not valid' });
  const user = await User.findById(blog.user.toString());

  if (!user)
    return response.status(401).json({
      error: 'userId missing or not valid',
    });

  blog.likes = blog.likes + 1;

  const updatedBlog = await blog.save();

  user.blogs = user.blogs.map((blog) =>
    blog._id.toString() === id.toString() ? updatedBlog._id : blog
  );

  await user.save();

  return response.json(updatedBlog);
});

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const decodedUser = req.user;

    if (!decodedUser.id)
      return res.status(401).json({ error: 'token invalid' });

    const blog = await Blog.findById(id);
    if (!blog)
      return res.status(404).json({ error: 'blogId missing or not valid' });

    const comment = new Comment({
      content,
      blog: blog._id,
    });

    const savedComment = await comment.save();

    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    return res.status(201).json(savedComment);
  }
);

module.exports = blogsRouter;
