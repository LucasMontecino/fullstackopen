import express from 'express';
import { newUserParser } from '../utils/middlewares';
import {
  changeDisabledStatus,
  createUser,
  getUserById,
  getUsers,
  updateUsername,
} from '../controllers/userController';

export const userRoute = express.Router();

userRoute.post('/', newUserParser, createUser);
userRoute.get('/', getUsers);
userRoute.put('/:username', updateUsername);

userRoute.put('/change-user-status/:id', changeDisabledStatus);

userRoute.get('/:id', getUserById);
