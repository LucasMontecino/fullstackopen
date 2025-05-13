import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import NotificationMessage from './components/NotificationMessage';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import SuccessMessage from './components/SuccessMessage';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleUserData = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginService.login(userData);
      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(result)
      );
      blogService.setToken(result.token);
      setUser(result);
      setUserData({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error({ message: error.message });
      setErrors('wrong username or password');
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  };

  const handleNewBlog = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setErrors(null);
    try {
      const entryBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(entryBlog));
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
      setNotification(
        `a new blog ${entryBlog.title} by ${entryBlog.author} added`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error({ message: error.message });
      setErrors(error.message);
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
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <NotificationMessage
            type={'error'}
            message={errors}
          />
          <LoginForm
            usernameValue={userData.username}
            passwordValue={userData.password}
            handleChange={handleUserData}
            handleSubmit={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <NotificationMessage
            message={notification}
            type={''}
          />
          <div>
            {user.name} logged in
            <Logout handleClick={handleLogout} />
          </div>
          <CreateBlog
            title={newBlog.title}
            author={newBlog.author}
            url={newBlog.url}
            handleChange={handleNewBlog}
            handleSubmit={handleAddBlog}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
