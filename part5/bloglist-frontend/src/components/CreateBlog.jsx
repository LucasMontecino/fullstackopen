import InputText from './InputText';

const CreateBlog = ({
  title,
  author,
  url,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <InputText
          htmlFor={'title'}
          label={'title:'}
          name={'title'}
          id={'title'}
          value={title}
          onChange={handleChange}
          autoComplete={'title'}
          type={'text'}
        />
        <InputText
          htmlFor={'author'}
          label={'author:'}
          name={'author'}
          id={'author'}
          value={author}
          onChange={handleChange}
          autoComplete={'author'}
          type={'text'}
        />
        <InputText
          htmlFor={'url'}
          label={'url:'}
          name={'url'}
          id={'url'}
          value={url}
          onChange={handleChange}
          autoComplete={'url'}
          type={'text'}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
