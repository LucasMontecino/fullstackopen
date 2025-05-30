import { useParams } from 'react-router-dom';
import Button from './Button';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  appendBlog,
  setBlog,
  setLikes,
} from '../store/reducers/blogDetailsReducer';
import { likeABlog } from '../store/reducers/blogsReducer';
import { setNotification } from '../store/reducers/notificationReducer';
import { setError } from '../store/reducers/errorReducer';
import CreateComment from './CreateComment';
import Loading from './Loading';
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogDetails = useSelector((state) => state.blogDetails);

  useEffect(() => {
    dispatch(setBlog(id));

    return () => {
      dispatch(appendBlog(null));
    };
  }, [dispatch, id]);

  const updateBlog = async (id) => {
    try {
      dispatch(likeABlog(id));
      dispatch(setLikes());

      dispatch(
        setNotification(
          `you successfully liked the blog ${blogDetails.title} by ${blogDetails.author}`,
          5
        )
      );
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  return (
    <Box>
      {!blogDetails ? (
        <Loading />
      ) : (
        <>
          <Typography variant="h3">{blogDetails.title ?? ''}</Typography>

          <Box
            sx={{ display: 'flex', alignItems: 'center', columnGap: 2, my: 2 }}
          >
            <Typography variant="body1">
              {blogDetails.likes ?? 0} likes
            </Typography>
            <Button
              label={'like'}
              type={'button'}
              onClick={() => updateBlog(blogDetails.id)}
              size="small"
              variant="outlined"
            />
          </Box>
          <Link
            href={blogDetails.url ?? ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Visit site'}
          </Link>
          <Typography variant="caption" sx={{ display: 'block', mt: 2 }}>
            added by {blogDetails.user?.name ?? ''}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
              comments
            </Typography>
            <CreateComment
              blogId={blogDetails.id}
              blogTitle={blogDetails.title}
            />
            {blogDetails.comments && blogDetails.comments.length > 0 ? (
              <Box sx={{ width: '100%' }}>
                <List>
                  {blogDetails.comments.map((comment) => (
                    <Fragment key={comment.id}>
                      <ListItem>
                        <ListItemText primary={comment.content} />
                      </ListItem>
                      <Divider />
                    </Fragment>
                  ))}
                </List>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                This blog doesnt have any comments yet
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BlogDetails;
