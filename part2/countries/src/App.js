import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [tooMany, setTooMany] = useState('')
  const [countryToShow, setCountryToShow] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const Countries = ({countries}) => {
    return (
        <div>
        {countriesToShow.map((country) => 
          <div key={country.name}>
          <p>{country.name}</p>
          </div>
        )}
        </div>
    )
  }

  const Country = ({country}) => {
    return (
        <div>
        {countryToShow.map((country) => 
          <div key={country.name}>
          <h1>{country.name}</h1>
          <p><b>Capital:</b> {country.capital}</p>
          <p><b>Population:</b> {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {country.languages.map(lang => 
              <li key={lang.iso639_1}>
              {lang.name}
              </li>
            )}
          </ul>
          <img src={country.flag} alt='flag' width='150px' />
          </div>
        )}
        </div>
    )
  }

  const handleFindChange = (event) => {
    const searchString = event.target.value
    const filtered = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))
    setCountriesToShow([])
    setCountryToShow([])
    setTooMany('')
    console.log(filtered.length);
    if (filtered.length > 10 && filtered.length < countries.length-1) {
        setTooMany('Too many matches, specify another filter')
    } else if (filtered.length > 1 && filtered.length <= 10){
        setCountriesToShow(filtered)
    } else if (filtered.length === 1){
        console.log(filtered);
        setCountryToShow(filtered)
    }
  }

  return (
    <div>
    <div>Filter shown with
      <input 
        onChange={handleFindChange}
      />
      <br/> {tooMany}
    </div>
        <Countries countries = {countriesToShow} />
        <Country country = {countryToShow} />
    </div>
  )
}

export default App