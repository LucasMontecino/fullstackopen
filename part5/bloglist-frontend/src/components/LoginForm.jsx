import Button from './Button';
import InputText from './InputText';
import PropTypes from 'prop-types';

const LoginForm = ({
  usernameValue,
  passwordValue,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputText
        htmlFor={'username'}
        label={'username'}
        name={'username'}
        id={'username'}
        value={usernameValue}
        onChange={handleChange}
        autoComplete={'username'}
        type={'text'}
      />
      <InputText
        htmlFor={'password'}
        label={'password'}
        name={'password'}
        id={'password'}
        value={passwordValue}
        onChange={handleChange}
        autoComplete={'current-password'}
        type={'password'}
      />
      <Button type={'submit'} label={'login'} />
    </form>
  );
};

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
