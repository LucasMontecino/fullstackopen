import { isNotNumber } from './utils';

interface BmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): BmiValues => {
  if (require.main === module) {
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
  } else {
    if (isNotNumber(args[0]) || isNotNumber(args[1])) {
      throw new Error('malformatted parameters');
    } else {
      return {
        height: Number(args[0]),
        weight: Number(args[1]),
      };
    }
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) * (height / 100));
  return result < 18.5
    ? 'Underweight'
    : result < 25
    ? 'Normal range'
    : result < 30
    ? 'Overweight'
    : 'Obese';
};

if (require.main === module) {
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
}
