import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const Notification = () => {
  const { state } = useContext(NotificationContext);
  return (
    (state.notification !== '' || state.error !== '') && (
      <div className="container">
        <p
          className={`notification ${
            state.notification && 'success'
          } ${state.error && 'error'}`}
        >
          {state.notification
            ? state.notification
            : state.error
            ? state.error
            : null}
        </p>
      </div>
    )
  );
};

export default Notification;
