import { Button, Container, Nav, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { token, logout } = useContext(TokenContext);
  const { user, setUser, loading } = useContext(UserContext);

  return (
    <Nav variant="tabs">
      <Container className="d-flex justify-content-between">
        <Stack direction="horizontal">
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
          {token && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to={'/add-book'}>
                  add book
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={'/recommend'}>
                  recommend
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Stack>
        <Stack direction="horizontal">
          {!token ? (
            <Nav.Item>
              <Nav.Link as={Link} to={'/login'}>
                login
              </Nav.Link>
            </Nav.Item>
          ) : (
            <>
              {loading ? (
                <p>Loading...</p>
              ) : !user ? null : (
                <Nav.Item>
                  <Nav.Link as={'p'}>{user.username}</Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link
                  as={Button}
                  variant="link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  logout
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Stack>
      </Container>
    </Nav>
  );
};

export default Navbar;
