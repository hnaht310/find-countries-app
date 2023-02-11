import CountryDetails from './CountryDetails';
import { useState } from 'react';

const CountryList = ({ countries }) => {
  const numOfCountries = countries.length;
  console.log(countries);

  if (numOfCountries > 10) {
    return <p>Too many matches</p>;
  }

  const Country = ({ country }) => {
    const [display, setDisplay] = useState(false);
    const toggleDisplay = () => {
      setDisplay((prevState) => !prevState);
    };

    return (
      <div>
        {country.name.common}
        <button onClick={toggleDisplay}>
          {display ? 'hide' : 'show details'}
        </button>
        {display && <CountryDetails {...country} />}
      </div>
    );
  };

  if (numOfCountries > 1 && numOfCountries <= 10) {
    return (
      <div>
        {countries.map((country, index) => {
          return (
            <div key={index}>
              <Country country={country} />
            </div>
          );
        })}
      </div>
    );
  }

  if (numOfCountries === 1) {
    return <CountryDetails {...countries[0]} />;
  }
};

export default CountryList;
