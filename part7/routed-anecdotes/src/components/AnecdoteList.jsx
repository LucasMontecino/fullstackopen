import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}
      </Link>
      <button type="button" onClick={handleClick}>
        vote
      </button>
    </li>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }),
  handleClick: PropTypes.func,
};

const AnecdoteList = ({ anecdotes, handleClick }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote.id)}
        />
      ))}
    </ul>
  </div>
);

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array,
  handleClick: PropTypes.func,
};

export default AnecdoteList;
