const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;
  if (blogs.length === 1) return blogs[0].likes;

  const reducer = (acc, el) => {
    return acc + el.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return 0;
  if (blogs.length === 1) return blogs[0];
  const result = [...blogs].sort((a, b) =>
    a.likes > b.likes ? -1 : 1
  );
  return result[0];
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return 0;
  if (blogs.length === 1)
    return { author: blogs[0].author, blogs: 1 };

  const blogsByAuthor = blogs.reduce((acc, blog) => {
    const existingAuthor = acc.find(
      (item) => item.author === blog.author
    );
    if (existingAuthor) {
      return acc.map((item) =>
        item.author === blog.author
          ? {
              ...item,
              blogs: item.blogs + 1,
            }
          : item
      );
    }
    return [...acc, { author: blog.author, blogs: 1 }];
  }, []);

  const [mostBlogsAuthor] = [...blogsByAuthor].sort(
    (a, b) => (a.blogs < b.blogs ? 1 : -1)
  );

  return {
    author: mostBlogsAuthor.author,
    blogs: mostBlogsAuthor.blogs,
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return 0;
  if (blogs.length === 1)
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };

  const likesByAuthor = blogs.reduce((acc, blog) => {
    const existingAuthor = acc.find(
      (item) => item.author === blog.author
    );
    if (existingAuthor) {
      return acc.map((item) =>
        item.author === blog.author
          ? {
              ...item,
              likes: item.likes + blog.likes,
            }
          : item
      );
    }
    return [
      ...acc,
      { author: blog.author, likes: blog.likes },
    ];
  }, []);

  const [mostLikesAuthor] = [...likesByAuthor].sort(
    (a, b) => (a.likes < b.likes ? 1 : -1)
  );

  return {
    author: mostLikesAuthor.author,
    likes: mostLikesAuthor.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
