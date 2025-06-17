import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import setMessage from '../utils/setMessage';
import { NotificationsContext } from '../context/NotificationsContext';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';

const Login = () => {
  const { setToken } = useContext(TokenContext);
  const { setError, setNotification } = useContext(NotificationsContext);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.error({ error: error.message });
      setMessage(setError, error.message);
    },
  });

  const handleChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      variables: { ...userData },
    });
    if (result.errors) return;

    setToken(result.data.login.value);
    localStorage.setItem('library-token', result.data.login.value);
    setMessage(setNotification, `${userData.username} login successfully!`);
    setUserData({
      username: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
