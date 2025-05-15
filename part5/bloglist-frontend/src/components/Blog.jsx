import { useState } from 'react';
import Button from './Button';

const Blog = ({ blog, updateBlog, children }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () =>
    setShowDetails((prev) => !prev);

  return (
    <div
      className="blog"
      style={{
        border: '1px solid #000',
        padding: '2px 6px',
      }}
    >
      {blog.title} {blog.author}
      <Button
        type={'button'}
        label={!showDetails ? 'view' : 'hide'}
        onClick={toggleDetails}
      />
      {showDetails && (
        <div>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
          <div>
            likes {blog.likes}{' '}
            <Button
              type={'button'}
              label={'like'}
              onClick={updateBlog}
            />
          </div>
          <div>{blog.user?.name ?? 'unknown creator'}</div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Blog;
