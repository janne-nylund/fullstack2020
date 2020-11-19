import React from 'react'
import { connect } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
  const sortedByVotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const filterByInput = (filter, anecdotes) => {
    const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    return filtered
  }

  const voting = (id, anecdote) => {
    props.voteOn(id, anecdote)
    props.setNotifications(`You voted on anecdote '${anecdote.content}'`, 5)
  }
 
  const styleInput = {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10
  }
  
  return (
    <div>
      {sortedByVotes(filterByInput(props.filter, props.anecdotes)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button  style={styleInput} onClick={() => voting(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes, filter: state.filter,
  }
}

const mapDispatchToProps = {
  voteOn, setNotifications
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList