import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import loginService from '../../services/login';
import { jwtDecode } from 'jwt-decode';

const initialState = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);

    if (Date.now() > user.expiration) {
      window.localStorage.removeItem('loggedUser');
      return null;
    }

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
    const decodedToken = jwtDecode(result.token);

    const expiration = decodedToken.exp * 1000;

    const userWithExpiration = {
      ...result,
      expiration,
    };

    dispatch(setUser(userWithExpiration));
    blogService.setToken(result.token);

    window.localStorage.setItem(
      'loggedUser',
      JSON.stringify(userWithExpiration)
    );

    const timeout = expiration - Date.now();
    setTimeout(() => {
      dispatch(logOut());
      window.localStorage.removeItem('loggedUser');
    }, timeout);
  };
};
