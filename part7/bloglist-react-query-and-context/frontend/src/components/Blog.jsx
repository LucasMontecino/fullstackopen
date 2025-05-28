import { useContext, useState } from 'react';
import Button from './Button';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { setNotifications, setErrors } from '../utils';
import { BlogsContext } from '../context/BlogsContext';

const Blog = ({ blog, children }) => {
  const [showDetails, setShowDetails] = useState(false);
  const queryClient = useQueryClient();

  const { dispatch } = useContext(BlogsContext);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      setNotifications(
        dispatch,
        `you successfully liked the blog ${updatedBlog.title} by ${updatedBlog.author}`
      );
    },
    onError: (error) => {
      console.error({ error: error.response?.data?.error ?? error.message });
      setErrors(dispatch, error.response?.data?.error ?? error.message);
    },
  });

  const updateBlog = (id) => {
    updateBlogMutation.mutate(
      {
        id,
        blog: { ...blog, likes: blog.likes + 1 },
      },
      {
        onSuccess: (updatedBlog) => {
          const blogs = queryClient.getQueryData(['blogs']);
          queryClient.setQueryData(
            ['blogs'],
            blogs.map((item) => (item.id === id ? updatedBlog : item))
          );
        },
      }
    );
  };

  return (
    <div
      className="blog"
      style={{
        border: '1px solid #000',
        padding: '2px 6px',
      }}
    >
      <span className="blog-title">{blog.title} </span>
      <span className="blog-author">{blog.author}</span>

      <Button
        type={'button'}
        label={!showDetails ? 'view' : 'hide'}
        onClick={toggleDetails}
        testid={'toggle-button'}
      />
      {showDetails && (
        <div>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-url"
          >
            {blog.url}
          </a>
          <div>
            <span className="blog-likes">likes {blog.likes} </span>
            <Button
              type={'button'}
              label={'like'}
              onClick={() => updateBlog(blog.id)}
              testid={'button-likes'}
            />
          </div>
          <div className="blog-creator">
            {blog.user?.name ?? 'unknown creator'}
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Blog;
