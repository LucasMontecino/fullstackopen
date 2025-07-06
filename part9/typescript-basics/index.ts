import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { parseArguments } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    if (!daily_exercises || !target) throw new Error('parameters missing');

    if (
      !Array.isArray(daily_exercises) ||
      daily_exercises.some((item) => isNotNumber(item as string)) ||
      isNotNumber(target as string)
    ) {
      throw new Error('malformatted parameters');
    }

    const result = calculateExercises(
      daily_exercises as number[],
      target as number
    );

    res.status(200).json(result);
  } catch (error: unknown) {
    let errMsg = 'Sth went wrong: ';
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
