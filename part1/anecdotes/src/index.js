import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // zero or random
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))

  const selectAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1  
    setVotes(copy)
  }

  const Most = () => {
    if (Math.max(...votes) > 0) {
    return(
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {Math.max(...votes)} votes</p>
    </div>
    )
  }
  return null
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={addVote} text='vote' />
      <Button onClick={selectAnecdote} text='next anecdote' />
      <Most />
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)