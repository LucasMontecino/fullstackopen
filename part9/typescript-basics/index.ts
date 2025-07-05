import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
  return;
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const result = calculateBmi(Number(height), Number(weight));

  res.json({ weight, height, bmi: result });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}/hello`);
});
