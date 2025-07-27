import express from 'express';
import { newUserParser } from '../utils/middlewares';
import {
  createUser,
  getUsers,
  updateUsername,
} from '../controllers/userController';

export const userRoute = express.Router();

userRoute.post('/', newUserParser, createUser);
userRoute.get('/', getUsers);
userRoute.put('/:username', updateUsername);
