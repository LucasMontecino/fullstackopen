import { useState, useEffect } from 'react';
import countryService from '../services/country';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;
    const fetchCountry = async () => {
      try {
        const countryData = await countryService.getCountry(
          name
        );
        setCountry({
          data: countryData.data,
          found: true,
        });
      } catch (error) {
        console.error({ error: error.message });
        setCountry({ data: {}, found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
