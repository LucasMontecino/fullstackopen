import express from 'express';
import {
  create,
  findById,
  getAll,
  remove,
  update,
} from '../controllers/blogController';

export const blogRoute = express.Router();

blogRoute.get('/', getAll);

blogRoute.post('/', create);

blogRoute.get('/:id', findById);

blogRoute.put('/:id', update);

blogRoute.delete('/:id', remove);
