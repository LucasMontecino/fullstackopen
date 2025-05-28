import { logOut } from '../store/reducers/userReducer';
import Button from './Button';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
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
