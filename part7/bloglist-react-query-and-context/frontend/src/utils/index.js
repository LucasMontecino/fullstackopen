export const setNotifications = (dispatch, payload, delay = 5) => {
  dispatch({
    type: 'SET_NOTIF',
    payload,
  });

  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIF' });
  }, delay * 1000);
};

export const setErrors = (dispatch, payload, delay = 5) => {
  dispatch({
    type: 'SET_ERRORS',
    payload,
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, delay * 1000);
};
