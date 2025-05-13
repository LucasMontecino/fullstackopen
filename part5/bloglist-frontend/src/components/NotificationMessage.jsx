const NotifcationMessage = ({ message, type }) => {
  return (
    message !== null && (
      <p
        style={{
          color: type === 'error' ? 'red' : 'green',
          border: '4px solid',
          borderColor: type === 'error' ? 'red' : 'green',
          borderRadius: '6px',
          backgroundColor: 'lightgrey',
          padding: '6px',
        }}
      >
        {message}
      </p>
    )
  );
};

export default NotifcationMessage;
