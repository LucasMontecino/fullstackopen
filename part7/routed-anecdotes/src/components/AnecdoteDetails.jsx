import PropTypes from 'prop-types';

const AnecdoteDetails = ({ anecdote }) => {
  return (
    <div>
      <h3>
        {anecdote?.content} by {anecdote?.author}
      </h3>
      <p>has {anecdote?.votes} votes</p>
      <p>
        for more info see{' '}
        <a
          href={anecdote?.info}
          target="_blank"
          rel="noopener noreferrer"
        >
          {anecdote?.info}
        </a>
      </p>
    </div>
  );
};

AnecdoteDetails.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    votes: PropTypes.number,
    info: PropTypes.string,
  }),
};

export default AnecdoteDetails;
