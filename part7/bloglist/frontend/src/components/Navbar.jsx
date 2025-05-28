import { useSelector } from 'react-redux';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav
      style={{
        display: 'flex',
        gap: 8,
        backgroundColor: '#ccc',
        padding: '6px 4px',
      }}
    >
      <Link to={'/'}>blogs</Link>
      <Link to={'/users'}>users</Link>
      {user.name} logged in - <Logout />
    </nav>
  );
};

export default Navbar;
