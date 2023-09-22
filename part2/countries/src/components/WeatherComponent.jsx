const weatherIconUrl = 'https://openweathermap.org/img/wn/'

function WeatherComponent({ weather }) {
  return (
    <div>
      <h2>{`Weather in ${weather.name}`}</h2>
      <p>temperature: {(weather.main.temp - 273.15).toFixed(2)}° Celsius</p>
      <img src={`${weatherIconUrl}${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description} />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default WeatherComponent
