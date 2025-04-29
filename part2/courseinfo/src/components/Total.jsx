const Total = (props) => {
  const { total } = props;

  const totalValue = total.reduce(
    (acc, el) => acc + el.exercises,
    0
  );

  return (
    <p>
      <strong>total of {totalValue} exercises</strong>
    </p>
  );
};

export default Total;
