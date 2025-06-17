import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../queries';
import { useState } from 'react';
import BookTable from './BookTable';
import Genres from './Genres';

const Books = () => {
  const [filter, setFilter] = useState('');
  const { data } = useQuery(ALL_BOOKS);
  const { data: filterData, loading: filterDataLoading } = useQuery(
    ALL_BOOKS_BY_GENRE,
    {
      variables: { genre: filter },
    }
  );

  const books = data?.allBooks || [];
  const booksFilter = filterData?.allBooks || [];

  const genres =
    books &&
    books
      .reduce((acc, el) => {
        el.genres.forEach((item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
        });
        return acc;
      }, [])
      .concat('all genres');

  const handleClick = (genre) => {
    setFilter(genre);
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{!filter ? 'all genres' : filter}</strong>
      </p>
      {filterDataLoading ? (
        <p>Loading...</p>
      ) : (
        <BookTable books={booksFilter}>
          <Genres genres={genres} handleClick={handleClick} />
        </BookTable>
      )}
    </div>
  );
};

export default Books;
