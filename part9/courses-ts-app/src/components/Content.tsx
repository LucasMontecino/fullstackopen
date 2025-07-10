import type { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return courses.map((c) => <Part course={c} key={c.name} />);
};

export default Content;
