import { Button, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Genres = ({ genres, handleClick }) => {
  return (
    <Nav className="gap-2 mt-4">
      {genres && genres.length > 0
        ? genres.map((item) => (
            <Nav.Item key={item}>
              <Button
                onClick={() =>
                  item === 'all genres' ? handleClick('') : handleClick(item)
                }
              >
                {item}
              </Button>
            </Nav.Item>
          ))
        : null}
    </Nav>
  );
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Genres;
