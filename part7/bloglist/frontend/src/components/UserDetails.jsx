import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, appendUser } from '../store/reducers/userDetailsReducer';

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
      <h2>{userDetails?.name ?? 'Unknown user'}</h2>
      <h3>added blogs</h3>
      <ul>
        {userDetails &&
          userDetails?.blogs &&
          userDetails.blogs.length > 0 &&
          userDetails.blogs.map((blog) => <li key={blog.url}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default UserDetails;
