import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    return (
    <div>
      <p>{props.text} {props.value}</p>
    </div> 
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
      <Statistics text='good' value={good} />
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />
      <Statistics text='all' value={good + neutral + bad} />
      <Statistics text='average' value={(good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)} />
      <Statistics text='positive' value={ good / (good + neutral + bad) * 100 + ' %'}  />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)