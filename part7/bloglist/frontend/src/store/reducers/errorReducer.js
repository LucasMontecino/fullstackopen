import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: '',
  reducers: {
    errorMessage(state, action) {
      return action.payload;
    },
    clearError(state, action) {
      return '';
    },
  },
});

export const { errorMessage, clearError } = errorSlice.actions;
export default errorSlice.reducer;

export const setError = (message, delay = 10) => {
  return (dispatch) => {
    dispatch(errorMessage(message));
    setTimeout(
      () => {
        dispatch(clearError());
      },
      `${delay * 1000}`
    );
  };
};
