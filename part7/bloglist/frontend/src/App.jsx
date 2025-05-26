import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NotificationMessage from './components/NotificationMessage';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import Button from './components/Button';
import { setNotification } from './store/reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBlog,
  setInitialBlogs,
  likeABlog,
  deleteBlog,
} from './store/reducers/blogsReducer';
import { setError } from './store/reducers/errorReducer';
import { loginUser, logOut } from './store/reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const errors = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const sortedBlogsByLikes = [...blogs].sort((a, b) =>
    a.likes < b.likes ? 1 : -1
  );

  const handleLogin = async (credentials) => {
    try {
      dispatch(loginUser(credentials));
      dispatch(setNotification('logged successfully!', 5));
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleAddBlog = async (newBlog) => {
    try {
      dispatch(setBlog(newBlog));

      blogFormRef.current.toggleVisibility();

      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      );
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  const updateBlog = async (id) => {
    const findBlog = blogs.find((item) => item.id === id);
    try {
      dispatch(likeABlog(id, findBlog));
      dispatch(
        setNotification(
          `you successfully liked the blog ${findBlog.title} by ${findBlog.author}`,
          5
        )
      );
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  const handleDelete = async (id) => {
    const findBlog = blogs.find((blog) => blog.id === id);
    try {
      const dialog = confirm(
        `Remove blog ${findBlog.title} by ${findBlog.author}`
      );
      if (dialog) {
        dispatch(deleteBlog(id));
        dispatch(setNotification('blog deleted successfully!', 5));
      }
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  useEffect(() => {
    dispatch(setInitialBlogs());
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
            <CreateBlog createBlog={handleAddBlog} />
          </Togglable>
          <div style={{ marginTop: '6px' }}>
            {sortedBlogsByLikes.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={() => updateBlog(blog.id)}
              >
                {user.username === blog?.user?.username && (
                  <Button
                    type={'button'}
                    label={'remove'}
                    onClick={() => handleDelete(blog.id)}
                  />
                )}
              </Blog>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
