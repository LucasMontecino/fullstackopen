import { useDispatch } from 'react-redux';
import { filter } from '../reducers/filterAnecdotesReducer';

const FilterAnecdotes = () => {
  const dispatch = useDispatch();
  const filterAnecdotesBy = (e) => {
    dispatch(filter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Filter anecdotes..."
      id="filter"
      name="filter"
      autoComplete="off"
      className="input-filter"
      title="type for searching anecdotes"
      onChange={filterAnecdotesBy}
    />
  );
};

export default FilterAnecdotes;
