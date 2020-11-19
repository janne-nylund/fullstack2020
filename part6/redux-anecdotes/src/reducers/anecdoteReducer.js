import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
      case 'NEW_ANECDOTE':{
        return [...state, action.data]
      }  
      case 'INITIAL': {
          return action.data
      }
      case 'VOTE': {
        const id = action.data.id
        const anecdoteToVote = state.find(anecdote => anecdote.id === id)
        const votedAnecdote = { ...anecdoteToVote }
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : votedAnecdote
        )
      }
      default:
        return state
    }
}

export const initialAnec = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIAL',
      data: anecdotes
    })
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec
    })
  }
}

export const voteOn = (id, anecdote) => {
  return async dispatch => {
    anecdote.votes = anecdote.votes + 1
    const updateVote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: updateVote
    })
  }
}

export default anecdoteReducer