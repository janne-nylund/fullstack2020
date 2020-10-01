import React,{useState, useEffect} from "react"
import axios from 'axios'

const WeatherFetch = (props) => {
    
    const capitalName = props.capital
    const key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(
        {
            "current":[
              { 
              "temperature": "",
              "wind_speed": "",
              "wind_dir": "",
              "weather_icons": "", 
              }  ]
          }
    )

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${key}&query=${capitalName}`)
    .then(response => {
        setWeather(response.data)
    })
},[capitalName, key])

return (
    <div>
        <h2>Weather in {capitalName}</h2>
        <p><b>Temperature: {weather.current.temperature} °C</b></p>
        <img alt={weather} src={weather.current.weather_icons} />
        <p><b>Wind:</b> {Math.round(weather.current.wind_speed/3.6)} m/s ({weather.current.wind_dir})</p>
    </div>
)
}
export default WeatherFetch;