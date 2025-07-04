import PropTypes from 'prop-types';

const BookTable = ({ children, books }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
                {a.title}
              </td>
              <td
                style={{
                  paddingRight: 20,
                  paddingLeft: 6,
                  borderRight: '2px solid #000',
                }}
              >
                {a.author.name}
              </td>
              <td style={{ textAlign: 'right', paddingRight: 6 }}>
                {a.published}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
};

BookTable.propTypes = {
  children: PropTypes.node,
  books: PropTypes.array.isRequired,
};

export default BookTable;
