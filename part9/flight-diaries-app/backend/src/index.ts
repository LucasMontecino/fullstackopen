import express from 'express';
import diaryRouter from './routes/diaryRouter';
import { unknownEndpoint, errorHandler } from './middlewares';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/ping', (_req, res) => {
  res.send('pong');
  return;
});

app.use('/api/diaries', diaryRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
