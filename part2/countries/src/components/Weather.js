import React,{useState, useEffect} from "react"
import axios from 'axios'

const WeatherFetch = (props) => {
    
    const capitalName = props.capital+','+props.alt
    const key = process.env.REACT_APP_API_KEY
    const [name,setName] = useState('')
    const [mainTemp,setMainTemp] = useState('')
    const [wind,setWind] = useState('')
    const [windDir,setWindDir] = useState('')
    const [iconID,setIconID] = useState('10d')
    const [weather,setWeather] = useState('')

    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${key}&units=metric`)
    .then(response => {
    setName(response.data.name)
    setMainTemp(Math.round(response.data.main.temp))
    setWind(response.data.wind.speed)
    setWindDir(response.data.wind.deg)
    setIconID(response.data.weather[0].icon)
    setWeather(response.data.weather[0].description.toUpperCase())
    })
},[capitalName, key])

const url = iconID + "@2x.png"
return (
    <div>
        <h2>Weather in {name}</h2>
        <p><b>Temperature: {mainTemp} °C</b></p>
        <img alt={weather} src={`http://openweathermap.org/img/wn/${url}`} />
        <p><small>{weather}</small></p>
        <p><b>Wind:</b> {wind} m/s ({windDir} degrees)</p>
    </div>
)
}
export default WeatherFetch;