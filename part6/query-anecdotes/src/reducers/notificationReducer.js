const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return {
        ...state,
        notification: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: '',
      };
    case 'CLEAR_NOTIF':
      return {
        ...state,
        notification: '',
      };
    default:
      return state;
  }
};

export default notificationReducer;
