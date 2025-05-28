import { useContext, useState } from 'react';
import InputText from './InputText';
import Button from './Button';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { setNotifications, setErrors } from '../utils';
import { BlogsContext } from '../context/BlogsContext';

const CreateBlog = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const { dispatch } = useContext(BlogsContext);

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      handleAddBlog();
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], [...blogs, newBlog]);
      setNotifications(
        dispatch,
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
    },
    onError: (error) => {
      console.error({ error: error.response?.data?.error ?? error.message });
      setErrors(dispatch, error.response?.data?.error ?? error.message);
    },
  });

  const handleNewBlog = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addBlog = async (e) => {
    e.preventDefault();

    newBlogMutation.mutate(newBlog);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div style={{ marginBottom: '6px' }}>
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
        </div>
        <Button type={'submit'} label={'create'} testid={'create'} />
      </form>
    </div>
  );
};

export default CreateBlog;
