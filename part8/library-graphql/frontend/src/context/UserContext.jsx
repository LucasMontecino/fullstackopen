import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ME } from '../queries';
import { TokenContext } from './TokenContext';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const { token } = useContext(TokenContext);
  const shouldFetch = !!token;

  const { data, loading } = useQuery(ME, {
    skip: !shouldFetch,
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data, token]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserContextProvider };
