import { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const Display = ({ text }) => <p>{text}</p>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positiveFeedback,
}) => {
  return (
    <div>
      <Header title={'statistics'} />
      {total === 0 ? (
        <Display text={'No feedback given'} />
      ) : (
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine
              text={'neutral'}
              value={neutral}
            />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'all'} value={total} />
            <StatisticLine
              text={'average'}
              value={average}
            />
            <StatisticLine
              text={'positive'}
              value={`${positiveFeedback}%`}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const average =
    (good * 1 + neutral * 0 + bad * -1) / total;

  const positiveFeedback = (good * 100) / total;

  console.log('first rendering state...', {
    good,
    neutral,
    bad,
  });
  console.log('rendering variables...', {
    total,
    average,
    positiveFeedback,
  });

  const handleGood = () => setGood((prev) => prev + 1);
  const handleNeutral = () =>
    setNeutral((prev) => prev + 1);
  const handleBad = () => setBad((prev) => prev + 1);

  return (
    <div>
      <Header title={'give feedback'} />
      <Button text={'good'} onClick={handleGood} />
      <Button text={'neutral'} onClick={handleNeutral} />
      <Button text={'bad'} onClick={handleBad} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        total={total}
        positiveFeedback={positiveFeedback}
      />
    </div>
  );
}

export default App;
