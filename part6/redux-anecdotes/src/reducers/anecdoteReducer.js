import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
      case 'NEW_ANECDOTE':
        return [...state, action.data]
      case 'INITIAL':
          return action.data
      case 'ADD_VOTE':
        const id = action.data.id
        const addLikeTo = state.find(a => a.id === id)
        const likedAnecdote = { 
          ...addLikeTo, 
          votes: addLikeTo.votes + 1 
        }
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : likedAnecdote 
        )
      default:
        return state
    }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

/* export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
} */

export const voteOn = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const initialAnec = (anecdotes) => {
  return {
    type: 'INITIAL',
    data: anecdotes
  }
}

export default anecdoteReducer