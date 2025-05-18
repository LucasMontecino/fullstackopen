import { useDispatch } from 'react-redux';
import {
  createAnecdote,
  clearNotification,
} from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(content));
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
