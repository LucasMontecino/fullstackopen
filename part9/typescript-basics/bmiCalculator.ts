import { isNotNumber } from './utils';

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length > 4) throw new Error('too many arguments');
  if (args.length < 4) throw new Error('not enough arguments');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('arguments must be numbers');
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) * (height / 100));
  return result < 18.5
    ? 'Underweight'
    : result < 25
    ? 'Normal range'
    : result < 30
    ? 'Overweight'
    : 'Obese';
};

try {
  const { height, weight } = parseArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errMsg = 'Sth went wrong: ';
  if (error instanceof Error) {
    errMsg += error.message;
  }
  console.error({ error: errMsg });
}
