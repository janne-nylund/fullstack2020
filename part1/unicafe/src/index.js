import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  
    if (props.good + props.neutral + props.bad === 0){
      return(
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
      )
    }
    return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all  { props.good + props.neutral + props.bad}</p>
      <p>average  { (props.good * 1 + props.neutral * 0 + props.bad * -1)/(props.good + props.neutral + props.bad) }</p>
      <p>positive  { props.good / (props.good + props.neutral + props.bad) * 100} %</p>
    </div> 
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}> 
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}> 
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}> 
        bad
      </button>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)