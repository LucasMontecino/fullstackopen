import type { IContent } from '../types';
import CoursePart from './CoursePart';

const Content = ({ courses }: { courses: IContent[] }) => {
  return courses.map((c) => <CoursePart course={c} key={c.name} />);
};

export default Content;
