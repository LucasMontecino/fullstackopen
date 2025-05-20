import {
  getAnecdotes,
  updateAnecdote,
} from '../services/requests';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import PropTypes from 'prop-types';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li className="list__item">
      <div>{anecdote?.content}</div>
      <div className="list__votes">
        <span className="list__has">
          has {anecdote?.votes}
        </span>
        <button
          className="btn btn-sm btn-secondary"
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

const AnecdotesList = () => {
  const queryClient = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData([
        'anecdotes',
      ]);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote);
  };

  if (isError) {
    return (
      <p className="container">
        anecdote service not available due to problems in
        server
      </p>
    );
  }

  if (isPending) {
    return <p className="container">loading data...</p>;
  }

  const anecdotes = data;

  return (
    <div className="container">
      <div className="list">
        <h3 className="list__title">Anecdotes</h3>
        <ul className="list__content">
          {anecdotes.map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => handleVote(anecdote)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnecdotesList;
