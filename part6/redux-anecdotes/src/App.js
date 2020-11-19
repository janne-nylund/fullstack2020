import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/AnecdoteFilter'
import { initialAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
//import anecdoteService from './services/anecdotes'


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initialAnec()) 
  },[dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList  />
    </div>
  )
}

export default App