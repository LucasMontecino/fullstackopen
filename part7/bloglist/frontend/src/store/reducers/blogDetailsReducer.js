import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const blogDetailsSlice = createSlice({
  name: 'blog-details',
  initialState: null,
  reducers: {
    appendBlog(state, action) {
      return action.payload;
    },
    setLikes(state, action) {
      return { ...state, likes: state.likes + 1 };
    },
    appendNewComment(state, action) {
      return { ...state, comments: state.comments.concat(action.payload) };
    },
  },
});

export const { appendBlog, setLikes, appendNewComment } =
  blogDetailsSlice.actions;
export default blogDetailsSlice.reducer;

export const setBlog = (id) => {
  return async (dispatch) => {
    const res = await blogsService.getResource(id);
    dispatch(appendBlog(res));
  };
};

export const setNewComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await blogsService.createNewComment(id, {
      content,
    });
    dispatch(appendNewComment(newComment));
  };
};
