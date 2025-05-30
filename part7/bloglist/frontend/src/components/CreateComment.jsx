import { useState } from 'react';
import Button from './Button';
import { setNewComment } from '../store/reducers/blogDetailsReducer';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/reducers/notificationReducer';
import { setError } from '../store/reducers/errorReducer';
import InputText from './InputText';
import { Box } from '@mui/material';

const CreateComment = ({ blogId, blogTitle }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setNewComment(blogId, content));
      dispatch(
        setNotification(
          `you've successfully made a comment on the blog ${blogTitle}`
        )
      );
    } catch (error) {
      console.error({ error: error.message });
      dispatch(setError(error.message));
    } finally {
      setContent('');
    }
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        rowGap: 2,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <InputText
        type="text"
        autoComplete="off"
        value={content}
        onChange={handleChange}
        placeholder="make a comment..."
        id="comment"
        name="comment"
      />
      <Button type={'submit'} label={'add comment'} />
    </Box>
  );
};

export default CreateComment;
