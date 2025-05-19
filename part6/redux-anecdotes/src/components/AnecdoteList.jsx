import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { appNotification } from '../reducers/notificationReducer';
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
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote));
    dispatch(
      appNotification(`You voted ${anecdote.content}`, 5)
    );
  };

  return (
    <div className="container anecdotes">
      <h2 className="anecdotes-title">Anecdotes</h2>
      <FilterAnecdotes />
      <ul className="anecdotes-list">
        {[...anecdotes]
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => vote(anecdote)}
            />
          ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
