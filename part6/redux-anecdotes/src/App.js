import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterAnecdotes from './components/AnecdoteFilter'
import { initialAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initialAnec()) 
  },[dispatch])
  
  return (
    <div>
      <h2>ANECDOTES</h2>
      <Notification />
      <FilterAnecdotes />
      <AnecdoteList  />
      <AnecdoteForm />
    </div>
  )
}

export default App