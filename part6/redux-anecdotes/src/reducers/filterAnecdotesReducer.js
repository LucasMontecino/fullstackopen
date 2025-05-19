import { createSlice } from '@reduxjs/toolkit';

const filterAnecdotesSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { filterAnecdotes } =
  filterAnecdotesSlice.actions;
export default filterAnecdotesSlice.reducer;
