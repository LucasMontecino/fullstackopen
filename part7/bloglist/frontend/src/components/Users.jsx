import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
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
  Link,
} from '@mui/material';
import MyTable from './MyTable';
import User from './User';

const Users = () => {
  const users = useSelector((state) => state.users);

  const tableHeads = [
    {
      id: 1,
      label: 'Name',
    },
    {
      id: 2,
      label: 'Username',
    },
    {
      id: 3,
      label: 'Last Blog',
    },
    {
      id: 4,
      label: 'Blogs Created',
      align: 'right',
    },
  ];

  return (
    <Box>
      <Typography variant="h2">Users</Typography>
      {!users ? (
        <Loading />
      ) : !users.length ? (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No users found
        </Typography>
      ) : (
        <MyTable tableHeads={tableHeads}>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </MyTable>
      )}
    </Box>
  );
};

export default Users;
