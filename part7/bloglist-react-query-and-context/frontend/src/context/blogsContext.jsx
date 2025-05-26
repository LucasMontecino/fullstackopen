import { createContext, useReducer } from 'react';
import blogsReducer from '../reducers/blogsReducer';

const BlogsContext = createContext(null);

const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, []);
  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

export { BlogsContext, BlogsContextProvider };
