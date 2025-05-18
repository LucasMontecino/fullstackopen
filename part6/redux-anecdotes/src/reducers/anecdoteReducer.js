const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

export const getId = () =>
  (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = {
  anecdotes: anecdotesAtStart.map(asObject),
  notification: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANECDOTE_VOTE': {
      const { id } = action.payload;
      return {
        ...state,
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        ),
      };
    }
    case 'NEW_ANECDOTE': {
      return {
        ...state,
        anecdotes: [...state.anecdotes, action.payload],
        notification: 'New note created!',
      };
    }
    case 'CLEAR_NOTIFICATION': {
      return {
        ...state,
        notification: '',
      };
    }
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return {
    type: 'ANECDOTE_VOTE',
    payload: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: { content: anecdote, id: getId(), votes: 0 },
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default reducer;
