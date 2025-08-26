import express from 'express';
import { logoutController } from '../controllers/logoutController';
import { tokenExtractor } from '../utils/middlewares';

export const logoutRoute = express.Router();

logoutRoute.delete('/', tokenExtractor, logoutController);
