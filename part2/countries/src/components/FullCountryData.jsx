import { useEffect, useState } from 'react'
import weatherApi from '../services/weatherApi.js'
import WeatherComponent from './WeatherComponent.jsx'

function FullCountryData({ countryData }) {
  const [weather, setWeather] = useState()

  useEffect(() => {
    weatherApi.getWeather(countryData.capital[0].toLowerCase(), countryData.cca2.toLowerCase())
    .then((data) => setWeather(data))
  }, [])

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>{`capital: ${countryData.capital[0]}`}</p>
      <p>{`area: ${countryData.area}`}</p>
      <br />
      <h3>languages:</h3>
      <ul>
        {Object.values(countryData.languages).map((language) => (<li key={language}>{language}</li>))}
      </ul>
      <img src={countryData.flags.svg} alt={countryData.flags.alt} width="20%" />
      {weather ? (<WeatherComponent weather={weather} />) : null}
    </div>
  )
}

export default FullCountryData
