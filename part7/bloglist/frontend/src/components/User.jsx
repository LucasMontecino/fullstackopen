import { Link, TableCell, TableRow, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link component={RouterLink} to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        {user.blogs.length > 0 ? (
          user.blogs.at(-1).title
        ) : (
          <Typography variant="body2" sx={{ color: '#f00' }}>
            No blogs found
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">{user.blogs?.length ?? 0}</TableCell>
    </TableRow>
  );
};

export default User;
