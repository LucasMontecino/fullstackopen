import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterAnecdotesReducer from './reducers/filterAnecdotesReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = {
  anecdotes: anecdoteReducer,
  filter: filterAnecdotesReducer,
  notification: notificationReducer,
};

const store = configureStore({ reducer });

export { store };
