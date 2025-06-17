import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Container } from 'react-bootstrap';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NotificationsContextProvider } from './context/NotificationsContext.jsx';
import ErrorNotification from './components/ErrorNotification.jsx';
import Notification from './components/Notification.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import { TokenContextProvider } from './context/TokenContext.jsx';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <TokenContextProvider>
        <UserContextProvider>
          <NotificationsContextProvider>
            <BrowserRouter>
              <Navbar />
              <Container className="mt-3">
                <Notification />
                <ErrorNotification />
                <App />
              </Container>
            </BrowserRouter>
          </NotificationsContextProvider>
        </UserContextProvider>
      </TokenContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
