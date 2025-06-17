import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/client';

const TokenContext = createContext(null);

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const libraryToken = localStorage.getItem('library-token');
    if (libraryToken) {
      setToken(libraryToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TokenContext, TokenContextProvider };
