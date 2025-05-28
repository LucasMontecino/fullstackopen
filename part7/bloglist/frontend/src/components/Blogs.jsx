import Blog from './Blog';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, setBlog } from '../store/reducers/blogsReducer';
import { setNotification } from '../store/reducers/notificationReducer';
import { setError } from '../store/reducers/errorReducer';
import { useRef } from 'react';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

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

  return (
    <>
      <h2>blog app</h2>
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog createBlog={handleAddBlog} />
      </Togglable>
      <div style={{ marginTop: '6px' }}>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
