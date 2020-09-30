import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import ClickedCountry from './components/ClickedCountry'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [tooMany, setTooMany] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countryToShow, setCountryToShow] = useState([])
  const [showClicked, setShowClicked] = useState([])

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
          <p>{country.name} 
            <button 
              value={country.name} 
              onClick={search => showClickedCountry(search.target.value)}
            >
              view
            </button>
          </p>
          </div>
        )}
        </div>
    )
  }

  const showClickedCountry= (search) => {
    const clickFilter = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    setShowClicked(clickFilter)
    setCountryToShow([])
  }

  const handleFindChange = (event) => {
    const searchString = event.target.value
    const filtered = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))
    setCountriesToShow([])
    setCountryToShow([])
    setShowClicked([])
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
        <ClickedCountry country = {showClicked} />
    </div>
  )
}

export default App