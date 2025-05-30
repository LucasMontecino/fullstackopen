import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, appendUser } from '../store/reducers/userDetailsReducer';
import Loading from './Loading';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(setUser(id));

    return () => {
      dispatch(appendUser(null));
    };
  }, [dispatch, id]);
  return (
    <Box>
      {!userDetails ? (
        <Loading />
      ) : (
        <>
          <Typography variant="h2">{userDetails.name ?? ''}</Typography>
          <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>
            added blogs
          </Typography>
          {userDetails.blogs && userDetails.blogs.length > 0 ? (
            <Box sx={{ width: '100%' }}>
              <List>
                {userDetails.blogs.map((blog) => (
                  <Fragment key={blog.url}>
                    <ListItem>
                      <ListItemText primary={blog.title} />
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
              </List>
            </Box>
          ) : (
            <p>No blogs found</p>
          )}
        </>
      )}
    </Box>
  );
};

export default UserDetails;
