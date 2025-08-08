import express, { Request, Response } from 'express';
import { errorHandler, unknownEndpoint } from './utils/middlewares';
import { blogRoute } from './routes/blogRoute';
import { userRoute } from './routes/userRoute';
import { loginRoute } from './routes/loginRoute';
import { authorRoute } from './routes/authorRoute';
import { readingListRoute } from './routes/readingListRoute';

const app = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.json('pong');
});

app.use('/api/blogs', blogRoute);
app.use('/api/users', userRoute);
app.use('/api/login', loginRoute);
app.use('/api/authors', authorRoute);
app.use('/api/readinglists', readingListRoute);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
