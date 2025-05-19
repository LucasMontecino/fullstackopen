import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import {
  getAnecdotes,
  updateAnecdote,
} from './services/requests';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

const App = () => {
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
      <p>
        anecdote service not available due to problems in
        server
      </p>
    );
  }

  if (isPending) {
    return <p>loading data...</p>;
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
