import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnec(content)
    props.setNotifications(`New anecdote added '${content}'`, 5)
  }

  const styleInput = {
    marginBottom: 10
  }
  const styleButton = {
    marginBottom: 20
  }

  return (
    <div>
    <h3>Add new anecdote</h3>
    <form onSubmit={addAnecdote}>
      <div><input style={styleInput} name="anecdote" /></div>
      <button style={styleButton} type="submit">Create</button>
    </form>
    </div>
  )
}

const mapDispatchToProps = { createAnec, setNotifications }
export default connect(null, mapDispatchToProps)(AnecdoteForm)