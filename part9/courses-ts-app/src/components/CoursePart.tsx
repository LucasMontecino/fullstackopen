import type { IContent } from '../types';

const CoursePart = ({ course }: { course: IContent }) => {
  return (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  );
};

export default CoursePart;
