import { useState, useEffect } from 'react'; // KORREKTUR 1: Nur ein Import
import './App.css';
import countryService from './services/countries';
import Display from './components/display'; // Tipp: Auf Großschreibung achten (Display.jsx)

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState(''); // KORREKTUR 2: Konsistenter Name

  useEffect(() => {
    console.log('fetching all countries');
    countryService
      .getAll()
      .then(initialCountries => {
        console.log('got all countries');
        setCountries(initialCountries);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleShowClick = (countryName) => {
    setSearch(countryName);
  };

  const getFilteredCountries = () => {
    if (!search) {
      return [];
    }
    return countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  };

  const countriesToShow = getFilteredCountries();

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <Display countries={countriesToShow}  onShowClick={handleShowClick} />
    </div>
  );
};

export default App;