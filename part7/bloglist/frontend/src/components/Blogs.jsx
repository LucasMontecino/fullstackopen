import Blog from './Blog';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, setBlog } from '../store/reducers/blogsReducer';
import { setNotification } from '../store/reducers/notificationReducer';
import { setError } from '../store/reducers/errorReducer';
import { useRef } from 'react';
import Loading from './Loading';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MyTable from './MyTable';

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

  const tableHeads = [
    {
      id: 1,
      label: 'Title',
    },
    {
      id: 2,
      label: 'Author',
    },
    {
      id: 3,
      label: 'N° Of Comments',
      align: 'right',
    },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Blog App
      </Typography>
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog createBlog={handleAddBlog} blogFormRef={blogFormRef} />
      </Togglable>
      {!blogs ? (
        <Loading />
      ) : !blogs.length ? (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No blogs found
        </Typography>
      ) : (
        <MyTable tableHeads={tableHeads}>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </MyTable>
      )}
    </Box>
  );
};

export default Blogs;
