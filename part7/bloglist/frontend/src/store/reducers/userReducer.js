import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import loginService from '../../services/login';

const initialState = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    return user;
  } else {
    return null;
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logOut(state, action) {
      window.localStorage.removeItem('loggedUser');
      return null;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const result = await loginService.login(credentials);
    dispatch(setUser(result));
    window.localStorage.setItem('loggedUser', JSON.stringify(result));
    blogService.setToken(result.token);
  };
};
