import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { useSelector } from 'react-redux';

const App = () => {
  const notification = useSelector(
    (state) => state.notification
  );
  return (
    <div>
      <header className="container">
        <h1>
          <a href="/">Anecdotes App</a>
        </h1>
      </header>
      <main>
        {notification && (
          <Notification message={notification} />
        )}
        <AnecdoteForm />
        <AnecdoteList />
      </main>
    </div>
  );
};

export default App;
