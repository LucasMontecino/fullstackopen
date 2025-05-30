import { useState } from 'react';
import Button from './Button';
import InputText from './InputText';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import NotificationMessage from './NotificationMessage';
import { useSelector } from 'react-redux';

const LoginForm = ({ handleLogin }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const errors = useSelector((state) => state.error);

  const handleUserData = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    await handleLogin(userData);

    setUserData({
      username: '',
      password: '',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        maxWidth: 600,
        m: '0 auto',
      }}
    >
      <NotificationMessage type={'error'} message={errors} />
      <Typography variant="h2">Log in to application</Typography>
      <Box
        component="form"
        onSubmit={loginUser}
        sx={{
          '& .MuiTextField-root': { m: 1 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          marginTop: 2,
        }}
      >
        <InputText
          name={'username'}
          id={'username'}
          value={userData.username}
          onChange={handleUserData}
          autoComplete={'username'}
          type={'text'}
        />
        <InputText
          name={'password'}
          id={'password'}
          value={userData.password}
          onChange={handleUserData}
          autoComplete={'current-password'}
          type={'password'}
        />
        <Button
          type={'submit'}
          label={'login'}
          testid={'submit-login'}
          sx={{ m: 1 }}
        />
      </Box>
    </Box>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
