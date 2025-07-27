import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export const createUser = async (
  req: Request<unknown, unknown, User & { password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user: User = await User.create({ ...req.body, passwordHash });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  } catch (error: unknown) {
    return next(error);
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] },
    });
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const updateUsername = async (
  req: Request<{ username: string }, unknown, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'user not found' });

    user.username = z.string().parse(req.body.username);
    await user.save();
    return res.json({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  } catch (error) {
    return next(error);
  }
};
