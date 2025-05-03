import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const weatherApiKey = import.meta.env.VITE_API_KEY;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${weatherApiKey}&units=metric`;

  useEffect(() => {
    axios.get(weatherURL).then((response) => {
      setWeather(response.data);
    });
  }, [weatherURL]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(
          (language) => (
            <li key={language}>{language}</li>
          )
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ maxWidth: '100%' }}
      />
      {weather !== null && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />

          <p>
            Wind {weather.wind.gust ?? weather.wind.speed}{' '}
            m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default Country;
