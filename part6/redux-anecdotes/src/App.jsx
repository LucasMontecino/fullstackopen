import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <header className="container">
        <h1>
          <a href="/">Anecdotes App</a>
        </h1>
      </header>
      <main>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </main>
    </div>
  );
};

export default App;
