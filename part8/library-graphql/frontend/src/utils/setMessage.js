const setMessage = (dispatch, message, delay = 5) => {
  dispatch(message);
  setTimeout(() => {
    dispatch(null);
  }, delay * 1000);
};

export default setMessage;
