import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import NotificationMessage from './components/NotificationMessage';
import { setNotification } from './store/reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialBlogs } from './store/reducers/blogsReducer';
import { setError } from './store/reducers/errorReducer';
import { loginUser } from './store/reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import Navbar from './components/Navbar';
import { setInitialUsers } from './store/reducers/usersReducer';
import { Container } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const errors = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials));
      dispatch(setNotification('logged successfully!', 5));
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  useEffect(() => {
    dispatch(setInitialBlogs());
    dispatch(setInitialUsers());
  }, [dispatch]);

  return (
    <div>
      {!user ? (
        <Container>
          <LoginForm handleLogin={handleLogin} />
        </Container>
      ) : (
        <div>
          <Navbar />
          <Container>
            <NotificationMessage message={notification} type={''} />
            <NotificationMessage type={'error'} message={errors} />
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>
          </Container>
        </div>
      )}
    </div>
  );
};

export default App;
