export const showError = (
  dispatch,
  message,
  timeout = 5000
) => {
  dispatch({
    type: 'SET_ERROR',
    payload: message,
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, timeout);
};
