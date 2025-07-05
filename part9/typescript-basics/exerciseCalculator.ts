import { isNotNumber } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  exercises: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('not enough arguments');

  if (isNotNumber(args[2]) || args.slice(3).some((item) => isNotNumber(item))) {
    throw new Error('arguments must be numbers');
  } else {
    return {
      target: Number(args[2]),
      exercises: args.slice(3).map((item) => Number(item)),
    };
  }
};

const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const greatherThanZero = (value: number): boolean => value > 0;
  const average: number =
    dailyExercises.reduce((acc, el) => acc + el, 0) / dailyExercises.length;

  const rating: number =
    average >= target ? 3 : average < target && average >= target * 0.5 ? 2 : 1;

  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter(greatherThanZero).length,
    success: average >= target,
    rating,
    ratingDescription:
      rating === 3
        ? "Keep going on, you're amazing!"
        : rating === 2
        ? 'not too bad but could be better'
        : "don't give up tiger, try to focus next time!",
    target,
    average,
  };
};

try {
  const { target, exercises } = parseArguments(process.argv);
  const myResult = calculateExercises(exercises, target);
  console.log(myResult);
} catch (error: unknown) {
  let errMsg = 'Sth went wrong: ';
  if (error instanceof Error) {
    errMsg += error.message;
  }
  console.error({ error: errMsg });
}
