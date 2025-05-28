export const initialState = {
  notification: null,
  errors: null,
  user: null,
};

export default function blogsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
      };
    case 'SET_NOTIF':
      return {
        ...state,
        notification: action.payload,
      };
    case 'CLEAR_NOTIF':
      return {
        ...state,
        notification: null,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
}
