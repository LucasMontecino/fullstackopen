import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import { useState } from 'react';
import EditAuthor from './EditAuthor';
const Authors = () => {
  const [authorToEdit, setAuthorToEdit] = useState(null);
  const { data, loading } = useQuery(ALL_AUTHORS);

  const authors = data?.allAuthors || [];

  return (
    <div>
      <h2>authors</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td onClick={() => setAuthorToEdit(a.name)}>
                  {authorToEdit === a.name ? (
                    <EditAuthor
                      name={a.name}
                      year={a.born}
                      setAuthorToEdit={setAuthorToEdit}
                    />
                  ) : (
                    a.born || 'null'
                  )}
                </td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Authors;
