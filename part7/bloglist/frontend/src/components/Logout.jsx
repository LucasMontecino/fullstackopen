import { logOut } from '../store/reducers/userReducer';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };
  return (
    <Button
      type={'button'}
      label={'logout'}
      onClick={handleLogout}
      testid={'logout'}
    />
  );
};

export default Logout;
