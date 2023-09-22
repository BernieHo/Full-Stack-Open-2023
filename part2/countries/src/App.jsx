import { useEffect, useState } from 'react'
import countriesApi from './services/countriesApi.js'
import CountryResults from './components/CountryResults.jsx'

function App() {
  const [inputText, setInputText] = useState('')
  const [countriesData, setCountriesData] = useState([])
  const [matchCountryNames, setMatchCountryNames] = useState([])

  const handleShowCountry = (country) => {
    setMatchCountryNames([country])
  }

  useEffect(() => {
    countriesApi.fetchAll().then((data) => {
      setCountriesData(data)
    })
  }, [])

  useEffect(() => {
    let filteredCountries = inputText
      ? countriesData
      .filter((country) => country.name.common.toUpperCase().includes(inputText.toUpperCase()))
      .map((country) => country.name.common)
      : []
    setMatchCountryNames(filteredCountries)
  }, [countriesData, inputText])

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  return (
    <div>
      <form>
        <label>find countries</label>
        <input value={inputText} onChange={handleInputChange} type="text" />
      </form>
      <CountryResults
        matchedNames={matchCountryNames}
        countriesData={countriesData}
        showCountry={handleShowCountry}
      />
    </div>
  )
}

export default App
