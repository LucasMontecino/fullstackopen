import { Request, Response, NextFunction } from 'express';
import { Session } from '../models';

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.decodedToken;

    await Session.destroy({ where: { id: sessionId } });

    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return next(error);
  }
};
