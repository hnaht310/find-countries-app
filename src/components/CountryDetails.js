import axios from 'axios';
import { useState, useEffect } from 'react';

const CountryDetails = (props) => {
  console.log(props);
  const [weatherInfo, setWeatherInfo] = useState(null);
  //   console.log(countryInfo);

  const api_key = process.env.REACT_APP_API_KEY;

  const { name, area, capital, languages, flags } = props;
  const languageList = Object.values(languages);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&APPID=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        return setWeatherInfo(response.data);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const res = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&APPID=${api_key}`
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //       setWeatherInfo(data);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <div>
      <h2>{name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <strong>Languages:</strong>
      <ul>
        {languageList.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt='country flag' />

      {/* check if the value of weatherInfo state has been set yet before displaying temperature info */}
      {weatherInfo && (
        <>
          <h2>Weather in {capital}</h2>
          <p>Temperature: {weatherInfo.main.temp} Fahrenheit</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            alt='weather-icon'
          />
          <p>Wind: {weatherInfo.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};
export default CountryDetails;
