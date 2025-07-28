import express from 'express';
import { getAuthors } from '../controllers/authorController';

export const authorRoute = express.Router();

authorRoute.get('/', getAuthors);
