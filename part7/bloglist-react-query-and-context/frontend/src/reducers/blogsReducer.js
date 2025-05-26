const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL_BLOGS': {
      return action.payload;
    }
    case 'ADD_BLOG': {
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
};

export default blogsReducer;
