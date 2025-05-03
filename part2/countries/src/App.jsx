import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Input from './components/Input';
import Content from './components/Content';

const url = `https://studies.cs.helsinki.fi/restcountries/api/all`;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState('');

  const countriesShow = countries
    .filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(input.toLowerCase())
    )
    .map(
      ({
        name,
        languages,
        fifa,
        capital,
        area,
        flags,
      }) => ({
        name,
        languages,
        id: fifa ?? name.common,
        capital,
        flags,
        area,
      })
    );

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Input
        id={'input-name'}
        name={'name'}
        value={input}
        handleChange={handleChange}
      />

      <Content
        countriesShow={countriesShow}
        input={input}
      />
    </div>
  );
};

export default App;
