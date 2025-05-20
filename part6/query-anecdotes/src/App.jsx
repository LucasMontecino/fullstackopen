import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <Navbar />

      <Notification />
      <AnecdoteForm />

      <AnecdotesList />
    </div>
  );
};

export default App;
