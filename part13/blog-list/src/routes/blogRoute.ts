import express from 'express';
import {
  createBlog,
  findBlogById,
  getBlogs,
  removeBlog,
  updateBlog,
} from '../controllers/blogController';
import { newBlogParser } from '../utils/middlewares';

export const blogRoute = express.Router();

blogRoute.get('/', getBlogs);

blogRoute.post('/', newBlogParser, createBlog);

blogRoute.get('/:id', findBlogById);

blogRoute.put('/:id', updateBlog);

blogRoute.delete('/:id', removeBlog);
