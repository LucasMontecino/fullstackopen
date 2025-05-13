import axios from 'axios';
const baseUrl = '/api/login';

// let token = null;

// const setToken = (newToken) => {
//     token = `Bearer ${newToken}`;
// }

const login = async (credentials) => {
  const result = await axios.post(baseUrl, credentials);
  return result.data;
};

export default {
  login,
};
