import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(
    (state) => state.notification
  );
  return (
    notification !== '' && (
      <p className="notification">{notification}</p>
    )
  );
};

export default Notification;
