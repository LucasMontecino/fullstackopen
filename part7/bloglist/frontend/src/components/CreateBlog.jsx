import { useState } from 'react';
import InputText from './InputText';
import Button from './Button';

const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

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
