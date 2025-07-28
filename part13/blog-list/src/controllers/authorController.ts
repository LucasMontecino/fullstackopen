import { NextFunction, Request, Response } from 'express';
import { Blog } from '../models';
import { col, fn } from 'sequelize';

export const getAuthors = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors: Blog[] = await Blog.findAll({
      attributes: [
        'author',
        [fn('COUNT', col('author')), 'articles'],
        [fn('SUM', col('likes')), 'likes'],
      ],
      group: 'author',
      order: [['likes', 'DESC']],
    });
    return res.json(authors);
  } catch (error) {
    return next(error);
  }
};
