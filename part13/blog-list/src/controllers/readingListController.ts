import { NextFunction, Request, Response } from 'express';
import { SetBlogSchema, UpdateReadingBlog } from '../schemas';
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

export const updateReadingBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reading = await ReadingList.findByPk(req.params.id);
    const { readed } = UpdateReadingBlog.parse(req.body);

    if (reading?.userId !== req.decodedToken.id)
      return res.status(401).json({ error: 'userId missing or not valid' });
    if (!reading)
      return res.status(404).json({ error: 'reading list not found' });

    reading.readed = readed;
    await reading.save();
    return res.json(reading);
  } catch (error) {
    return next(error);
  }
};
