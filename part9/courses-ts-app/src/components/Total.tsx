import type { ITotal } from '../types';

const Total = ({ totalExercises }: ITotal) => {
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
