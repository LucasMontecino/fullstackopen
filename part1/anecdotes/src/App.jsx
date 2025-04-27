import { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Display = ({ text }) => <p>{text}</p>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const Content = ({ title, anecdote, votes }) => {
  return (
    <>
      <Header title={title} />
      <Display text={anecdote} />
      <Display text={`has ${votes} votes`} />
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const maxVotes = Math.max(...votes);
  const anecdoteMostVote = votes.indexOf(maxVotes);

  console.log('max value...', maxVotes);
  console.log(
    'the anecdote with most votes...',
    anecdoteMostVote
  );

  console.log('rendering votes...', votes);

  const generateRandomNumber = (length) => {
    const lengthFloored = Math.floor(length);
    return Math.floor(Math.random() * (lengthFloored + 1));
  };

  const handleNextAnecdote = () => {
    const anecdoteRandomNumber = generateRandomNumber(
      anecdotes.length - 1
    );
    setSelected(anecdoteRandomNumber);
  };

  const handleVoteAnecdote = () => {
    const cpyVotes = [...votes];
    cpyVotes[selected] += 1;
    setVotes(cpyVotes);
  };

  return (
    <div>
      <Content
        title={'Anecdote of the day'}
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button onClick={handleVoteAnecdote} text={'vote'} />
      <Button
        onClick={handleNextAnecdote}
        text={'next anecdote'}
      />
      {!votes.every((vote) => vote === 0) && (
        <Content
          title={'Anecdote with most votes'}
          anecdote={anecdotes[anecdoteMostVote]}
          votes={maxVotes}
        />
      )}
    </div>
  );
};

export default App;
