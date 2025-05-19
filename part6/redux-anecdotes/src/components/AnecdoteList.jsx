import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import FilterAnecdotes from './FilterAnecdotes';
import PropTypes from 'prop-types';
import anecdoteService from '../services/anecdotes';

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

  const vote = async (anecdote) => {
    await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(voteAnecdote(anecdote.id));
    dispatch(
      setNotification(`You voted ${anecdote.content}`)
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
