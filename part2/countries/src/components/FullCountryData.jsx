function FullCountryData({countryData}) {
  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>{`capital: ${countryData.capital}`}</p>
      <p>{`area: ${countryData.area}`}</p>
      <br/>
      <h3>languages:</h3>
      <ul>
        {Object.values(countryData.languages).map((language) => (<li key={language}>{language}</li>))}
      </ul>
      <img src={countryData.flags.svg} alt={countryData.flags.alt} width='20%'/>
    </div>
  )
}

export default FullCountryData
