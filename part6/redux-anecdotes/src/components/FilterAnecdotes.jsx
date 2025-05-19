import { useDispatch } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterAnecdotesReducer';

const FilterAnecdotes = () => {
  const dispatch = useDispatch();
  const filterAnecdotesBy = (e) => {
    dispatch(filterAnecdotes(e.target.value));
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
