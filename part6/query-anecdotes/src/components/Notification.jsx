import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const Notification = () => {
  const { state } = useContext(NotificationContext);
  return (
    state.notification !== '' && (
      <div className="notification container">
        <p className="notification__text">
          {state.notification}
        </p>
      </div>
    )
  );
};

export default Notification;
