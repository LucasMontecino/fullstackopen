import express from 'express';
import { setReadingBlog } from '../controllers/readingListController';

export const readingListRoute = express.Router();

readingListRoute.post('/', setReadingBlog);
