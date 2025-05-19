import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios.get(baseUrl).then((res) => res.data);

export const createNewAnecdote = (newNote) => {
  if (newNote.content.length < 5)
    throw new Error(
      'Anecdotes must be at least 5 characters long'
    );
  return axios
    .post(baseUrl, newNote)
    .then((res) => res.data);
};

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, {
      ...updatedAnecdote,
      votes: updatedAnecdote.votes + 1,
    })
    .then((res) => res.data);
