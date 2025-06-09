import { useContext } from 'react';
import { NotificationsContext } from '../context/NotificationsContext';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const { notification } = useContext(NotificationsContext);

  return notification && <Alert variant="success">{notification}</Alert>;
};

export default Notification;
