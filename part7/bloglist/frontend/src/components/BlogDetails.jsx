import { useParams } from 'react-router-dom';
import Button from './Button';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  appendBlog,
  setBlog,
  setLikes,
} from '../store/reducers/blogDetailsReducer';
import { likeABlog } from '../store/reducers/blogsReducer';
import { setNotification } from '../store/reducers/notificationReducer';
import { setError } from '../store/reducers/errorReducer';
import CreateComment from './CreateComment';
import Loading from './Loading';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogDetails = useSelector((state) => state.blogDetails);

  useEffect(() => {
    dispatch(setBlog(id));

    return () => {
      dispatch(appendBlog(null));
    };
  }, [dispatch, id]);

  const updateBlog = async (id) => {
    try {
      dispatch(likeABlog(id));
      dispatch(setLikes());

      dispatch(
        setNotification(
          `you successfully liked the blog ${blogDetails.title} by ${blogDetails.author}`,
          5
        )
      );
    } catch (error) {
      console.error({ message: error.response.data.error });
      dispatch(setError(error.response.data.error, 5));
    }
  };

  return (
    <div>
      {!blogDetails ? (
        <Loading />
      ) : (
        <>
          <h2>{blogDetails.title ?? ''}</h2>
          <a
            href={blogDetails.url ?? ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blogDetails.url ?? ''}
          </a>
          <div>
            <span>{blogDetails.likes ?? 0} likes</span>
            <Button
              label={'like'}
              type={'button'}
              onClick={() => updateBlog(blogDetails.id)}
            />
          </div>
          <p>added by {blogDetails.user?.name ?? ''}</p>
          <h3>comments</h3>
          <CreateComment
            blogId={blogDetails.id}
            blogTitle={blogDetails.title}
          />
          {blogDetails.comments && blogDetails.comments.length > 0 ? (
            <ul>
              {blogDetails.comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>
          ) : (
            <p>this blog doesnt have any comments yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetails;
