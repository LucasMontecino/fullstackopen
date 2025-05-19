import { createNewAnecdote } from '../services/requests';
import {
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData([
        'anecdotes',
      ]);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.concat(anecdote)
      );
    },
    onError: () => {
      setTimeout(() => {
        newAnecdoteMutation.reset();
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input
          name="anecdote"
          id="anecdote"
          placeholder="Create anecdote..."
          autoComplete="off"
        />
        <button type="submit">create</button>
      </form>
      {newAnecdoteMutation.isError && (
        <p style={{ color: '#f00' }}>
          {newAnecdoteMutation.error.message}
        </p>
      )}
    </div>
  );
};

export default AnecdoteForm;
