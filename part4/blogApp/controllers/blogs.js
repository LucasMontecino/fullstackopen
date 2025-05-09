const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.likes) {
    body.likes = 0;
  }

  const blog = new Blog(body);
  const savedBlog = await blog.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog)
    return response
      .status(404)
      .send(`No resource find with id ${id}`);
  else return response.status(204).end;
});

module.exports = blogsRouter;
