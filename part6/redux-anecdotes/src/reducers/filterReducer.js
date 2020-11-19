const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTES':
      return action.search
    default:
      return state
    }
  }
  
  export const changeFilter = (search) => {
    return {
      type: 'FILTER_ANECDOTES',
      search,
    }
  }
  
  export default reducer