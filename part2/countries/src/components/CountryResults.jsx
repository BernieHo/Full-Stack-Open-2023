import FullCountryData from './FullCountryData.jsx'

function CountryResults({ matchedNames, countriesData }) {
  if (matchedNames.length === 0) {
    return (<></>)
  }
  if (matchedNames.length === 1) {
    return (
      <FullCountryData
        countryData={countriesData.find((country) => matchedNames[0] === country.name.common)}
      />
    )
  }
  if (matchedNames.length <= 10) {
    return (
      <ul>{matchedNames.map((country) => <li key={country}>{country}</li>)}</ul>
    )
  } else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}

export default CountryResults
