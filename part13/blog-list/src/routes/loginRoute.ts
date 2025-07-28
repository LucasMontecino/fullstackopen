import express from 'express';
import { loginUserParser } from '../utils/middlewares';
import { login } from '../controllers/loginController';

export const loginRoute = express.Router();

loginRoute.post('/', loginUserParser, login);
