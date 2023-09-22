import axios from 'axios'

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='
const APIKey = import.meta.env.VITE_API_KEY

const getWeather = (city, countryCode) => {
  const request = axios.get(`${apiURL}${city},${countryCode}&APPID=${APIKey}`)
  return request.then(response => response.data)
}

export default { getWeather }