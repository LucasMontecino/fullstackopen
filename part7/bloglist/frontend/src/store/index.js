import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import errorReducer from './reducers/errorReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import userDetailsReducer from './reducers/userDetailsReducer';
import blogDetailsReducer from './reducers/blogDetailsReducer';

const reducer = {
  notification: notificationReducer,
  blogs: blogsReducer,
  error: errorReducer,
  user: userReducer,
  users: usersReducer,
  userDetails: userDetailsReducer,
  blogDetails: blogDetailsReducer,
};

export const store = configureStore({ reducer });
