import { Alert } from '@mui/material';

const NotificationMessage = ({ message, type }) => {
  return (
    message !== '' && (
      <Alert
        sx={{ width: '100%' }}
        severity={`${type === 'error' ? 'error' : 'success'}`}
      >
        {message}
      </Alert>
    )
  );
};

export default NotificationMessage;
