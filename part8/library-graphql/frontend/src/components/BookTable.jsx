import PropTypes from 'prop-types';

const BookTable = ({ children, books }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
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
