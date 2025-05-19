export const filterAnecdotesReducer = (
  state = '',
  action
) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
};

export const filter = (value) => {
  return {
    type: 'SET_FILTER',
    payload: value,
  };
};
