import { createContext, useReducer } from 'react';
import blogsReducer, { initialState } from '../reducers';

const BlogsContext = createContext(null);

const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, initialState);

  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

export { BlogsContext, BlogsContextProvider };
