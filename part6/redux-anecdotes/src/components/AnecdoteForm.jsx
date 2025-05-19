import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(
      setNotification('New note created successfully!')
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  return (
    <div className="anecdote-form">
      <div className="container row">
        <h2>create new</h2>
        <form onSubmit={addAnecdote} className="row">
          <input
            id="anecdote"
            name="anecdote"
            type="text"
            placeholder="Create anecdote..."
            autoComplete="off"
            title="type for creating new notes"
          />
          <button type="submit" className="btn btn-md">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnecdoteForm;
