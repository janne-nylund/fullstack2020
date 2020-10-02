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
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
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
    setTooMany('')
    
    if (filtered.length > 10 && filtered.length < countries.length-1) {
        setTooMany('Too many matches, specify another filter')
        setCountriesToShow([])
        setCountryToShow([])
        setShowClicked([])
    } else if (filtered.length > 1 && filtered.length <= 10){
        setCountriesToShow(filtered)
        setCountryToShow([])
        setShowClicked([])
    } else if (filtered.length === 1){
        setCountryToShow(filtered)
        setCountriesToShow([])
        setShowClicked([])   
    }  else if (filtered.length === 0){
      setCountriesToShow([])
      setShowClicked([])
      setCountryToShow([])
      setTooMany('No matches found')   
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