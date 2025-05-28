import { createSlice } from '@reduxjs/toolkit';
import usersService from '../../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    appendUsers(state, action) {
      return action.payload;
    },
  },
});

export const { appendUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const setInitialUsers = () => {
  return async (dispatch) => {
    const res = await usersService.getAll();
    dispatch(appendUsers(res));
  };
};
