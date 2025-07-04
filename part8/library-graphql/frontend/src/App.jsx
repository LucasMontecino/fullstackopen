import { Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';
import { useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import { useContext } from 'react';
import { NotificationsContext } from './context/NotificationsContext';
import setMessage from './utils/setMessage';
import { updateCache } from './utils/updateCache';

const App = () => {
  const { setNotification } = useContext(NotificationsContext);
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      setMessage(
        setNotification,
        `new book: ${addedBook.title} added successfully!`
      );

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  return (
    <Routes>
      <Route path="/" element={<Authors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      <Route path="/add-book" element={<NewBook />} />
      <Route path="/recommend" element={<Recommend />} />
    </Routes>
  );
};

export default App;
