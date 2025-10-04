import CountryDetail from './countryDetail';

const Display = ({ countries, onShowClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => onShowClick(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    const country = countries[0];
    return <CountryDetail country={country} />;
  }

  return null;
};

export default Display;
