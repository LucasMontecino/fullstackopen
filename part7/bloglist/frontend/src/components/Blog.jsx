import { Link, TableCell, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Link component={RouterLink} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell align="right">
        {blog.comments.length > 0 ? blog.comments.length : 0}
      </TableCell>
    </TableRow>
  );
};

export default Blog;
