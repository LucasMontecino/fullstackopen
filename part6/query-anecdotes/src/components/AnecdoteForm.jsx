import { useContext } from 'react';
import { createNewAnecdote } from '../services/requests';
import {
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { NotificationContext } from '../context/NotificationContext';
import truncateWord from '../utils/truncateWord';
import { showNotification } from '../utils/notification';

const AnecdoteForm = () => {
  const { dispatch } = useContext(NotificationContext);
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
      showNotification(
        dispatch,
        `Note '${truncateWord(
          anecdote.content.toLowerCase()
        )}' created successfully!`
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
    <div className="container form">
      <h1 className="form__title">Create new</h1>
      <form onSubmit={onCreate} className="form__content">
        <input
          name="anecdote"
          id="anecdote"
          placeholder="Create anecdote..."
          autoComplete="off"
          className="form__input"
        />
        <button type="submit" className="btn">
          create
        </button>
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
