import Country from './Country';
import Display from './Display';
import SimpleCountry from './SimpleCountry';

const Content = ({ countriesShow, input }) => {
  return countriesShow.length === 1 ? (
    <Country country={countriesShow[0]} />
  ) : countriesShow.length <= 10 ? (
    <div>
      {countriesShow.map((country) => (
        <SimpleCountry country={country} key={country.id} />
      ))}
    </div>
  ) : input.length > 0 && countriesShow.length > 10 ? (
    <Display
      text={'Too many matches, specify another filter'}
    />
  ) : (
    <Display text={'Enter filter values please'} />
  );
};

export default Content;
