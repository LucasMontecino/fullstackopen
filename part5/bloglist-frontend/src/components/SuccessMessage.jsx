const SuccessMessage = ({ message }) => {
  return (
    message !== null && (
      <p style={{ color: 'green' }}>{message}</p>
    )
  );
};

export default SuccessMessage;
