import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import errorReducer from './reducers/errorReducer';
import userReducer from './reducers/userReducer';

const reducer = {
  notification: notificationReducer,
  blogs: blogsReducer,
  error: errorReducer,
  user: userReducer,
};

export const store = configureStore({ reducer });
