import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, undefined, config);
  return response.data;
};

const deleteItem = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

const getResource = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const createNewComment = async (id, content) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(`${baseUrl}/${id}/comments`, content, config);
  return res.data;
};

export default {
  getAll,
  create,
  setToken,
  update,
  deleteItem,
  getResource,
  createNewComment,
};
