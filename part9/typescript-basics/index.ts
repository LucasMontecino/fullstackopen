import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { parseArguments } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
  return;
});

app.get('/bmi', (req, res) => {
  const query = req.query;

  try {
    if (
      query.height &&
      typeof query.height === 'string' &&
      query.weight &&
      typeof query.weight === 'string'
    ) {
      const { height, weight } = parseArguments([query.height, query.weight]);

      const result = calculateBmi(height, weight);

      res.json({ weight, height, bmi: result });
      return;
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error: unknown) {
    let errMsg: string = 'Sth went wrong: ';
    if (error instanceof Error) {
      errMsg += error.message;
    }
    res.status(400).json({ error: errMsg });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
