import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  
  const voting = (id, anecdote) => {
    dispatch(voteOn(id, anecdote))
    dispatch(setNotifications(`You voted on anecdote '${anecdote.content}'`, 5))
  }

  const filterByInput = () => {
    const filteredAnecdotes = [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes
  }
  
  const sortedByVotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  return (
    <div>
      {sortedByVotes(filterByInput()).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voting(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList