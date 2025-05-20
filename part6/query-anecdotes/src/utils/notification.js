export const showNotification = (
  dispatch,
  message,
  timeout = 5000
) => {
  dispatch({
    type: 'SET_NOTIF',
    payload: message,
  });

  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIF' });
  }, timeout);
};
