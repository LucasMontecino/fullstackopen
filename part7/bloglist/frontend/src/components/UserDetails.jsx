import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, appendUser } from '../store/reducers/userDetailsReducer';
import Loading from './Loading';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(setUser(id));

    return () => {
      dispatch(appendUser(null));
    };
  }, [dispatch, id]);
  return (
    <div>
      {!userDetails ? (
        <Loading />
      ) : (
        <>
          <h2>{userDetails.name ?? ''}</h2>
          <h3>added blogs</h3>
          {userDetails.blogs && userDetails.blogs.length > 0 ? (
            <ul>
              {userDetails.blogs.map((blog) => (
                <li key={blog.url}>{blog.title}</li>
              ))}
            </ul>
          ) : (
            <p>No blogs found</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserDetails;
