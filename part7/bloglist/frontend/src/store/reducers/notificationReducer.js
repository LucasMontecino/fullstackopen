import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notifMessage(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return '';
    },
  },
});

export const { notifMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, delay = 10) => {
  return (dispatch) => {
    dispatch(notifMessage(message));
    setTimeout(
      () => {
        dispatch(clearNotification());
      },
      `${delay * 1000}`
    );
  };
};
