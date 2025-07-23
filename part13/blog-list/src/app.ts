import express, { Request, Response } from 'express';
import { errorHandler, unknownEndpoint } from './utils/middlewares';
import { blogRoute } from './routes/blogRoute';

const app = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.json('pong');
});

app.use('/api/blogs', blogRoute);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
