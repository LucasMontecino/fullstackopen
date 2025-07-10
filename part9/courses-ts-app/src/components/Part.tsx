import type { CoursePart } from '../types';
import { assertNever } from '../helpers';

const PartBase = ({ course }: { course: CoursePart }) => (
  <h3>
    {course.name} {course.exerciseCount}
  </h3>
);

const PartDescription = ({ course }: { course: CoursePart }) => {
  if (
    course.kind === 'basic' ||
    course.kind === 'background' ||
    course.kind === 'special'
  ) {
    return (
      <>
        <PartBase course={course} />
        <p style={{ fontStyle: 'italic' }}>{course.description}</p>
      </>
    );
  }
};

const PartDynamic = ({ course }: { course: CoursePart }) => {
  if (course.kind === 'group')
    return <p>Project exercises {course.groupProjectCount}</p>;
  if (course.kind === 'background')
    return <p>Submit to {course.backgroundMaterial}</p>;
  if (course.kind === 'special')
    return <p>Required skills: {course.requirements.join(', ')}</p>;
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <PartDescription course={course} />
        </div>
      );
    case 'group':
      return (
        <div>
          <PartBase course={course} />
          <PartDynamic course={course} />
        </div>
      );
    case 'background':
      return (
        <div>
          <PartDescription course={course} />
          <PartDynamic course={course} />
        </div>
      );
    case 'special':
      return (
        <div>
          <PartDescription course={course} />
          <PartDynamic course={course} />
        </div>
      );

    default:
      return assertNever(course);
  }
};

export default Part;
