import { useContext, useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries';
import { useMutation } from '@apollo/client';
import setMessage from '../utils/setMessage';
import { NotificationsContext } from '../context/NotificationsContext';

const NewBook = () => {
  const { setError, setNotification } = useContext(NotificationsContext);
  const [book, setBook] = useState({
    title: '',
    author: '',
    published: '',
    genres: [],
  });
  const [genre, setGenre] = useState('');

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    errorPolicy: 'none',
    onError: (error) => {
      console.error({ error: error.message });
      setMessage(setError, error.message);
    },
  });

  const handleChange = (e) =>
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const result = await addBook({
      variables: { ...book, published: parseInt(book.published) },
    });

    if (result.errors) return;

    setMessage(setNotification, `new book: ${book.title} added successfully!`);

    setBook({
      title: '',
      author: '',
      published: '',
      genres: [],
    });
  };

  const addGenre = () => {
    setBook((prev) => ({ ...prev, genres: prev.genres.concat(genre) }));
    setGenre('');
  };

  const deleteGenre = (genre) => {
    setBook((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genre),
    }));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={book.title} name="title" onChange={handleChange} />
        </div>
        <div>
          author
          <input value={book.author} name="author" onChange={handleChange} />
        </div>
        <div>
          published
          <input
            type="number"
            value={book.published}
            name="published"
            onChange={handleChange}
          />
        </div>
        <div>
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <h6>genres: </h6>
        <ul>
          {book.genres.map((g) => (
            <li key={g} onClick={() => deleteGenre(g)}>
              {g}
            </li>
          ))}
        </ul>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
