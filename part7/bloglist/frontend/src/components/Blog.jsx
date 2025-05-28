import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div
      className="blog"
      style={{
        border: '1px solid #000',
        padding: '2px 6px',
      }}
    >
      <Link to={`/blogs/${blog.id}`}>
        <span className="blog-title">{blog.title} </span>
        <span className="blog-author">{blog.author}</span>
      </Link>
    </div>
  );
};

export default Blog;
