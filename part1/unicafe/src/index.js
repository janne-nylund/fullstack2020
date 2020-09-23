import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
    return (
    <tr>
      <td>{props.text}</td><td> {props.value}</td>
    </tr> 
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100 + ' %'

  return (
  <table>
      <tbody>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={all} />
      <Statistic text='average' value={average} />
      <Statistic text='positive' value={positive}  />
      </tbody>
  </table>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  if (good + neutral + bad === 0){
    return(
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
        <Button onClick={handleBad} text='bad' />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)