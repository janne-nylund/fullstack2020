import React from 'react'

const Country = ({country}) => {
    return (
        <div>
        {country.map((country) => 
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

export default Country