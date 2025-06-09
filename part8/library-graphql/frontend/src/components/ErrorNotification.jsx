import { useContext } from 'react';
import { NotificationsContext } from '../context/NotificationsContext';
import { Alert } from 'react-bootstrap';

const ErrorNotification = () => {
  const { error } = useContext(NotificationsContext);

  return error && <Alert variant="danger">{error}</Alert>;
};

export default ErrorNotification;
