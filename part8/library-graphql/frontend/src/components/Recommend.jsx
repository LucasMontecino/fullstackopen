import { useQuery } from '@apollo/client';
import { ALL_BOOKS_BY_GENRE } from '../queries';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import BookTable from './BookTable';

const Recommend = () => {
  const { user } = useContext(UserContext);

  const favoriteGenre = user?.favoriteGenre;

  const { data, loading } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  const booksRecommended = data?.allBooks || [];

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      {loading || !user || !favoriteGenre ? (
        <p>Loading...</p>
      ) : (
        <BookTable books={booksRecommended} />
      )}
    </div>
  );
};

export default Recommend;
