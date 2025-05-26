import { useState } from 'react';
import Button from './Button';

const Blog = ({ blog, updateBlog, children }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

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
              onClick={updateBlog}
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
