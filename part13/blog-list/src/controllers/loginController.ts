import { User } from '../models';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginUser, UserData } from '../types/types';
import config from '../utils/config';

export const login = async (
  req: Request<unknown, unknown, UserData>,
  res: Response<LoginUser | { error: string }>,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).json({ error: 'user not found' });

    const passwordCompare = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCompare) throw new Error('incorrect password');

    const userForToken = { username: user.username, id: user.id };

    const token = jwt.sign(userForToken, config.SECRET_KEY);

    return res.json({ token, username: user.username, name: user.name });
  } catch (error) {
    return next(error);
  }
};
