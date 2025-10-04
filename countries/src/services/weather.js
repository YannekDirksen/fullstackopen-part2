import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getForCapital = (capital) => {
  const requestUrl = `${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`;
  
  const request = axios.get(requestUrl);
  return request.then(response => response.data);
};

export default { getForCapital };