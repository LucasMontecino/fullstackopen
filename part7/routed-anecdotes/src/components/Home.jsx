import AnecdoteList from './AnecdoteList';
import PropTypes from 'prop-types';

const Home = ({ anecdotes, handleClick }) => {
  return (
    <>
      <h1>Software anecdotes</h1>
      <AnecdoteList
        anecdotes={anecdotes}
        handleClick={handleClick}
      />
    </>
  );
};

Home.propTypes = {
  anecdotes: PropTypes.array,
  handleClick: PropTypes.func,
};

export default Home;
