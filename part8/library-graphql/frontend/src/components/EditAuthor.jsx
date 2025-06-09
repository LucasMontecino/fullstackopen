import { useContext, useState } from 'react';
import { NotificationsContext } from '../context/NotificationsContext';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import setMessage from '../utils/setMessage';
import proptypes from 'prop-types';

const EditAuthor = ({ name, year, setAuthorToEdit }) => {
  const { setError, setNotification } = useContext(NotificationsContext);

  const [born, setBorn] = useState(parseInt(year) || '');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error({ error: error.message });
      setMessage(setError, error.message);
    },
  });

  const handleChange = (e) => setBorn(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editAuthor({
      variables: { name, setBornTo: parseInt(born) },
    });
    if (result.errors) return;
    setMessage(setNotification, `author: ${name} updated!`);

    setAuthorToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={born} onChange={handleChange} type="number" name="born" />
      <button type="submit">edit author</button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setAuthorToEdit(null);
        }}
      >
        close
      </button>
    </form>
  );
};

EditAuthor.propTypes = {
  name: proptypes.string,
  year: proptypes.number,
  setAuthorToEdit: proptypes.func.isRequired,
};

export default EditAuthor;
