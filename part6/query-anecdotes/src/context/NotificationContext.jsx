import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import notificationReducer from '../reducers/notificationReducer';

const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    { notification: '' }
  );

  return (
    <NotificationContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node,
};

export { NotificationContext, NotificationContextProvider };
