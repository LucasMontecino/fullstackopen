import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';
import BookTable from './BookTable';
import Genres from './Genres';

const Books = () => {
  const [filter, setFilter] = useState('');
  const { data, loading } = useQuery(ALL_BOOKS);

  const books = data?.allBooks || [];

  const filteredBooks =
    filter === '' || filter === 'all genres'
      ? books
      : books.filter((book) => book.genres.includes(filter));

  const genres = books
    .reduce((acc, el) => {
      el.genres.forEach((genre) => {
        if (!acc.includes(genre)) {
          acc.push(genre);
        }
      });
      return acc;
    }, [])
    .concat('all genres');

  const handleClick = (genre) => {
    setFilter(genre === 'all genres' ? '' : genre);
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{filter || 'all genres'}</strong>
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BookTable books={filteredBooks}>
          <Genres genres={genres} handleClick={handleClick} />
        </BookTable>
      )}
    </div>
  );
};

export default Books;
