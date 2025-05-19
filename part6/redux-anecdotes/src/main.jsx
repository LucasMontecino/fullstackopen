import ReactDOM from 'react-dom/client';
import {
  legacy_createStore as createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { anecdoteReducer } from './reducers/anecdoteReducer';
import { filterAnecdotesReducer } from './reducers/filterAnecdotesReducer';
import { notificationReducer } from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterAnecdotesReducer,
  notification: notificationReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
