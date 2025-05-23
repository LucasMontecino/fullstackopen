import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClean = () => setValue('');

  return [{ type, value, onChange }, onClean];
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResource = async () => {
      const res = await axios.get(baseUrl);
      setResources(res.data);
    };
    fetchResource();
  }, [baseUrl]);

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);
    setResources([...resources, res.data]);
    return res.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};
