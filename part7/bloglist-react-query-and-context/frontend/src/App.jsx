import { useState, useEffect, useRef, useContext } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import NotificationMessage from './components/NotificationMessage';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import Button from './components/Button';
import { BlogsContext } from './context/BlogsContext';
import { setNotifications, setErrors } from './utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const App = () => {
  const { state, dispatch } = useContext(BlogsContext);
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const blogs = data ? [...data].sort((a, b) => b.likes - a.likes) : [];

  const user = state.user;
  const notification = state.notification;
  const errors = state.errors;

  const blogFormRef = useRef();

  const handleAddBlog = () => {
    blogFormRef.current.toggleVisibility();
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteItem,
    onSuccess: () => {
      setNotifications(dispatch, 'blog deleted successfully!');
    },
    onError: () => {
      console.error({ error: error.response.data.error ?? error.message });
      setErrors(dispatch, error.response.data.error ?? error.message);
    },
  });

  const deleteBlog = (id) => {
    const findBlog = blogs.find((blog) => blog.id === id);
    const dialog = confirm(
      `Remove blog ${findBlog.title} by ${findBlog.author}`
    );
    if (dialog) {
      deleteBlogMutation.mutate(id, {
        onSuccess: () => {
          const blogs = queryClient.getQueryData(['blogs']);
          queryClient.setQueryData(
            ['blogs'],
            blogs.filter((item) => item.id !== id)
          );
        },
      });
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const result = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(result));
      blogService.setToken(result.token);
      dispatch({ type: 'SET_USER', payload: result });
      setNotifications(dispatch, 'logged successfully!');
    } catch (error) {
      console.error({ error: error.response.data.error ?? error.message });
      setErrors(dispatch, error.response.data.error ?? error.message);
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'CLEAR_USER' });
    window.localStorage.removeItem('loggedUser');
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: 'SET_USER', payload: user });
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <div>
      {!user ? (
        <div>
          <h2 className="login-title">log in to application</h2>
          <NotificationMessage type={'error'} message={errors} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <NotificationMessage message={notification} type={''} />
          <NotificationMessage type={'error'} message={errors} />
          <div style={{ marginBottom: '1rem' }}>
            {user.name} logged in - <Logout handleClick={handleLogout} />
          </div>
          <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
            <CreateBlog handleAddBlog={handleAddBlog} />
          </Togglable>
          <div style={{ marginTop: '6px' }}>
            {isPending ? (
              <p>Loading data...</p>
            ) : isError ? (
              <p>Error: {error.message}</p>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <Blog key={blog.id} blog={blog}>
                  {user.username === blog?.user?.username && (
                    <Button
                      type={'button'}
                      label={'remove'}
                      onClick={() => deleteBlog(blog.id)}
                    />
                  )}
                </Blog>
              ))
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
