const NotificationError = ({ message, onClose }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="toast toast-error">
      <p className="toast__close">
        <button
          className="icon"
          onClick={onClose}
          title="Close notification"
        >
          x
        </button>
      </p>
      <p className="toast__text">😵‍💫 {message}</p>
    </div>
  );
};

export default NotificationError;
