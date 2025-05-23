import { useState } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import Menu from './components/Menu';
import About from './components/About';
import Footer from './components/Footer';
import CreateNew from './components/CreateNew';
import Home from './components/Home';
import AnecdoteDetails from './components/AnecdoteDetails';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content:
        'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');
  const match = useMatch('/anecdotes/:id');

  const anecdote = match
    ? anecdotes.find(
        (item) => item.id === Number(match.params.id)
      )
    : null;

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));

    setNotification(
      `a new anecdote ${anecdote.content} created!`
    );
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const anecdoteById = (id) =>
    anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setNotification(`anecdote ${voted.content} voted!`);

    setAnecdotes(
      anecdotes.map((a) => (a.id === id ? voted : a))
    );

    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  return (
    <div>
      <Menu>
        <p>{notification}</p>
      </Menu>
      <Routes>
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteDetails anecdote={anecdote} />}
        />
        <Route
          path="/"
          element={
            <Home
              anecdotes={anecdotes}
              handleClick={vote}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
