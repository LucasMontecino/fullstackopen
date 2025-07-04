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
              <th>author name</th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr
                key={a.id}
                style={{
                  borderBottom: '2px solid #000',
                  borderRight: '2px solid #000',
                  borderLeft: '2px solid #000',
                }}
              >
                <td
                  style={{
                    paddingRight: 20,
                    paddingLeft: 6,
                    borderRight: '2px solid #000',
                  }}
                >
                  {a.name}
                </td>
                <td
                  onClick={() => setAuthorToEdit(a.name)}
                  style={{
                    textAlign: 'right',
                    paddingLeft: 36,
                    paddingRight: 6,
                    borderRight: '2px solid #000',
                  }}
                >
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
                <td style={{ textAlign: 'right', paddingRight: 6 }}>
                  {a.bookCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Authors;
