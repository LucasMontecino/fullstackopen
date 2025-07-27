import { NextFunction, Request, Response } from 'express';
import { Blog } from '../models';

export const getBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await Blog.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(blogs);
  } catch (error) {
    return next(error);
  }
};

export const createBlog = async (
  req: Request<unknown, unknown, Blog>,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return next(error);
  }
};

export const findBlogById = async (
  req: Request<{ id: string }>,
  res: Response<Blog | null | { error: string }>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    return blog
      ? res.json(blog)
      : res.status(404).json({ error: 'blog not found' });
  } catch (error) {
    return next(error);
  }
};

export const updateBlog = async (
  req: Request<{ id: string }, unknown, Blog>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: 'blog not found' });

    blog.likes = blog.likes + 1;

    await blog.save();

    return res.json(blog);
  } catch (error) {
    return next(error);
  }
};

export const removeBlog = async (
  req: Request<{ id: string }>,
  res: Response<Blog | string | null | { error: string }>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: 'blog not found' });
    await blog.destroy();
    return res.json(`Blog ${blog.title} deleted!`);
  } catch (error) {
    return next(error);
  }
};
