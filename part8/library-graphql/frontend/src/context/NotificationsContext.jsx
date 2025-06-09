import { createContext, useState } from 'react';
import proptypes from 'prop-types';

const NotificationsContext = createContext(null);

const NotificationsContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  return (
    <NotificationsContext.Provider
      value={{ error, setError, notification, setNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

NotificationsContextProvider.propTypes = {
  children: proptypes.node.isRequired,
};

export { NotificationsContext, NotificationsContextProvider };
