const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return {
        ...state,
        notification: action.payload,
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

export const dispatchNotification = (content) => {
  return (dispatch) => {
    dispatch({ type: 'SET_NOTIF', payload: content });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIF' });
    }, 5000);
  };
};

export default notificationReducer;
