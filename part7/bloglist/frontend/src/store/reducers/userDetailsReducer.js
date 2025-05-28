import { createSlice } from '@reduxjs/toolkit';
import usersService from '../../services/users';

const userDetailsSlice = createSlice({
  name: 'user-details',
  initialState: null,
  reducers: {
    appendUser(state, action) {
      return action.payload;
    },
  },
});

export const { appendUser } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;

export const setUser = (id) => {
  return async (dispatch) => {
    const res = await usersService.getResource(id);
    dispatch(appendUser(res));
  };
};
