import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createNew(state, action) {
      return [...state, action.payload];
    },
    appendBlogs(state, action) {
      return action.payload;
    },

    updateBlog(state, action) {
      return state.map((item) =>
        item.id === action.payload ? { ...item, likes: item.likes + 1 } : item
      );
    },
    removeBlog(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { createNew, appendBlogs, updateBlog, removeBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;

export const deleteBlog = (id) => {
  return async (dispatch) => {
    dispatch(removeBlog(id));
    await blogService.deleteItem(id);
  };
};

export const likeABlog = (id, entryBlog) => {
  return async (dispatch) => {
    dispatch(updateBlog(id));
    await blogService.update(id, {
      ...entryBlog,
      likes: entryBlog.likes + 1,
    });
  };
};

export const setInitialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(appendBlogs(blogs));
  };
};

export const setBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createNew(newBlog));
    return newBlog;
  };
};
