import { NextFunction, Request, Response } from 'express';
import { SetBlogSchema } from '../schemas';
import ReadingList from '../models/ReadingList';

export const setReadingBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, blogId } = SetBlogSchema.parse(req.body);

    const addedBlog = await ReadingList.create({ userId, blogId });
    return res.status(201).json(addedBlog);
  } catch (error) {
    return next(error);
  }
};
