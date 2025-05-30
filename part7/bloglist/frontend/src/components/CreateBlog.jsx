import { useRef, useState } from 'react';
import InputText from './InputText';
import Button from './Button';
import { Box, Typography } from '@mui/material';

const CreateBlog = ({ createBlog, blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleClick = () => {
    blogFormRef.current.toggleVisibility();
  };

  const handleNewBlog = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addBlog = async (e) => {
    e.preventDefault();

    await createBlog(newBlog);

    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Create new
      </Typography>
      <Box
        component={'form'}
        onSubmit={addBlog}
        sx={{
          '& .MuiTextField-root': {
            mr: {
              xs: 0,
              md: 1,
            },
            width: '40ch',
            my: {
              xs: 2,
              lg: 0,
            },
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <InputText
            htmlFor={'title'}
            label={'title:'}
            name={'title'}
            id={'title'}
            value={newBlog.title}
            onChange={handleNewBlog}
            autoComplete={'off'}
            type={'text'}
          />
          <InputText
            htmlFor={'author'}
            label={'author:'}
            name={'author'}
            id={'author'}
            value={newBlog.author}
            onChange={handleNewBlog}
            autoComplete={'off'}
            type={'text'}
          />
          <InputText
            htmlFor={'url'}
            label={'url:'}
            name={'url'}
            id={'url'}
            value={newBlog.url}
            onChange={handleNewBlog}
            autoComplete={'url'}
            type={'text'}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'stretch',
          }}
        >
          <Button
            type={'submit'}
            label={'create'}
            testid={'create'}
            color="success"
            sx={{ flexGrow: 0 }}
          />
          <Button
            type={'button'}
            label={'cancel'}
            testid={'cancel'}
            color="error"
            onClick={handleClick}
            sx={{ flexGrow: 0 }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default CreateBlog;
