import { useState } from 'react';
import Country from './Country';

const SimpleCountry = ({ country }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={() => setShowMore((prev) => !prev)}>
        {showMore ? 'Hide' : 'Show'}
      </button>
      {showMore && <Country country={country} />}
    </div>
  );
};

export default SimpleCountry;
