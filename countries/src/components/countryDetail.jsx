import { useState, useEffect } from 'react';
import weatherService from '../services/weather'; // Passe den Pfad ggf. an

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const capital = country.capital[0];

    console.log(`fetching weather for ${capital}...`);
    weatherService
      .getForCapital(capital)
      .then(weatherData => {
        console.log('...got weather', weatherData);
        setWeather(weatherData);
      })
      .catch(error => {
        console.error("Failed to fetch weather:", error);
      });

  }, [country.capital[0]]); 

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
          {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;