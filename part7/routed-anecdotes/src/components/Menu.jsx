import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ children }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to={'/'} style={padding}>
        anecdotes
      </Link>
      <Link to={'/create'} style={padding}>
        create new
      </Link>
      <Link to={'/about'} style={padding}>
        about
      </Link>
      {children}
    </div>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
};

export default Menu;
