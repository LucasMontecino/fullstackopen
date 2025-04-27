const Header = (props) => {
  console.log(props);
  const { course } = props;

  return <h1>{course}</h1>;
};

const Part = (prop) => {
  console.log(prop);
  const { part } = prop;
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log(props);
  const { parts } = props;
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

const Total = (props) => {
  console.log(props);
  const { parts } = props;
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((acc, el) => acc + el.exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
