import express from 'express';
import {
  setReadingBlog,
  updateReadingBlog,
} from '../controllers/readingListController';
import { tokenExtractor } from '../utils/middlewares';

export const readingListRoute = express.Router();

readingListRoute.post('/', setReadingBlog);
readingListRoute.put('/:id', tokenExtractor, updateReadingBlog);
