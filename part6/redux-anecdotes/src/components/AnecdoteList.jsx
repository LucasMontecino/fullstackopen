import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import FilterAnecdotes from './FilterAnecdotes';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <p>{anecdote.content}</p>
      <div className="anecdote-secondary">
        <strong className="votes">
          has {anecdote.votes}
        </strong>
        <button
          className="btn btn-sm"
          onClick={handleClick}
        >
          vote
        </button>
      </div>
    </li>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string,
    votes: PropTypes.number,
  }),
  handleClick: PropTypes.func,
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes.sort(
        (a, b) => b.votes - a.votes
      );
    }
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div className="container anecdotes">
      <h2 className="anecdotes-title">Anecdotes</h2>
      <FilterAnecdotes />
      <ul className="anecdotes-list">
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
