const NotificationMessage = ({ message, type }) => {
  return (
    message && (
      <p
        style={{
          color: type === 'error' ? 'red' : 'green',
          border: '4px solid',
          borderColor: type === 'error' ? 'red' : 'green',
          borderRadius: '6px',
          backgroundColor: 'lightgrey',
          padding: '6px',
        }}
        className="notification"
      >
        {message}
      </p>
    )
  );
};

export default NotificationMessage;
