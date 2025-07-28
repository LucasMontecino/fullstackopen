import { NextFunction, Request, Response } from 'express';
import { Blog, User } from '../models';
import { Op, WhereOptions } from 'sequelize';

interface QueryParams {
  search?: string;
}

export const getBlogs = async (
  req: Request,
  res: Response<Blog[]>,
  next: NextFunction
) => {
  try {
    const { search } = req.query as QueryParams;

    const where: WhereOptions<Blog> = search
      ? {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              author: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    const blogs = await Blog.findAll({
      order: [['likes', 'DESC']],
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name', 'username'],
      },
      where,
    });
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
    const user = await User.findByPk(req.decodedToken.id);

    if (!user) throw new Error('userId missing or not valid');

    const blog = await Blog.create({ ...req.body, userId: user.id });
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
    const blog = await Blog.findByPk(id, {
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name', 'username'],
      },
    });
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

    if (blog.userId && req.decodedToken.id !== blog.userId)
      return res.status(401).json({ error: 'invalid token or user id' });

    await blog.destroy();
    return res.json(`Blog ${blog.title} deleted!`);
  } catch (error) {
    return next(error);
  }
};
