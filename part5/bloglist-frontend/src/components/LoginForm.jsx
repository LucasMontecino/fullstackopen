import InputText from './InputText';

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
        autoComplete={'password'}
        type={'password'}
      />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
