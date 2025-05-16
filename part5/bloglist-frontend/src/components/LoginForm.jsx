import { useState } from 'react';
import Button from './Button';
import InputText from './InputText';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

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
    <form onSubmit={loginUser}>
      <InputText
        htmlFor={'username'}
        label={'username'}
        name={'username'}
        id={'username'}
        value={userData.username}
        onChange={handleUserData}
        autoComplete={'username'}
        type={'text'}
      />
      <InputText
        htmlFor={'password'}
        label={'password'}
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
      />
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
