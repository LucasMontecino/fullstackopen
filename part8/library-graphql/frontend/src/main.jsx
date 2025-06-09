import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Books from './components/Books.jsx';
import NewBook from './components/NewBook.jsx';
import Navbar from './components/Navbar.jsx';
import { Container } from 'react-bootstrap';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NotificationsContextProvider } from './context/NotificationsContext.jsx';
import ErrorNotification from './components/ErrorNotification.jsx';
import Notification from './components/Notification.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NotificationsContextProvider>
        <BrowserRouter>
          <Navbar />
          <Container className="mt-3">
            <Notification />
            <ErrorNotification />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/books" element={<Books />} />
              <Route path="/add-book" element={<NewBook />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </NotificationsContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
