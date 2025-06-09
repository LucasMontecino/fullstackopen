import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Nav variant="tabs">
      <Container className="d-flex">
        <Nav.Item>
          <Nav.Link as={Link} to={'/'}>
            author
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={'/books'}>
            books
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={'/add-book'}>
            add book
          </Nav.Link>
        </Nav.Item>
      </Container>
    </Nav>
  );
};

export default Navbar;
