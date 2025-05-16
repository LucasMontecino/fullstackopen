import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import NotificationMessage from './components/NotificationMessage';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import Button from './components/Button';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState(null);

  const blogFormRef = useRef();

  const sortedBlogsByLikes = [...blogs].sort((a, b) =>
    a.likes < b.likes ? 1 : -1
  );

  const handleLogin = async (credentials) => {
    try {
      const result = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(result)
      );
      blogService.setToken(result.token);
      setUser(result);
      setNotification('logged successfully!');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error({ message: error.response.data.error });
      setErrors(error.response.data.error);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  };

  const handleAddBlog = async (newBlog) => {
    setErrors(null);
    try {
      const entryBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(entryBlog));

      blogFormRef.current.toggleVisibility();

      setNotification(
        `a new blog ${entryBlog.title} by ${entryBlog.author} added`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error({ message: error.response.data.error });
      setErrors(error.response.data.error);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };

  const updateBlog = async (id) => {
    const findBlog = blogs.find((blog) => blog.id === id);
    setErrors(null);
    try {
      const entryBlog = await blogService.update(id, {
        ...findBlog,
        likes: findBlog.likes + 1,
      });

      setBlogs(
        blogs.map((blog) =>
          blog.id === id
            ? {
                ...entryBlog,
                user: findBlog.user,
              }
            : blog
        )
      );

      setNotification(
        `you successfully liked the blog ${entryBlog.title} by ${entryBlog.author}`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error({ message: error.response.data.error });
      setErrors(error.response.data.error);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    const findBlog = blogs.find((blog) => blog.id === id);
    try {
      const dialog = confirm(
        `Remove blog ${findBlog.title} by ${findBlog.author}`
      );
      if (dialog) {
        await blogService.deleteItem(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setNotification('blog deleted successfully!');
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (error) {
      console.error({ message: error.response.data.error });
      setErrors(error.response.data.error);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <div>
          <h2>log in to application</h2>
          <NotificationMessage
            type={'error'}
            message={errors}
          />
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <NotificationMessage
            message={notification}
            type={''}
          />
          <NotificationMessage
            type={'error'}
            message={errors}
          />
          <div style={{ marginBottom: '1rem' }}>
            {user.name} logged in -{' '}
            <Logout handleClick={handleLogout} />
          </div>
          <Togglable
            buttonLabel={'create new blog'}
            ref={blogFormRef}
          >
            <CreateBlog createBlog={handleAddBlog} />
          </Togglable>
          <div style={{ marginTop: '6px' }}>
            {sortedBlogsByLikes.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={() => updateBlog(blog.id)}
              >
                {user.username === blog.user.username && (
                  <Button
                    type={'button'}
                    label={'remove'}
                    onClick={() => deleteBlog(blog.id)}
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
