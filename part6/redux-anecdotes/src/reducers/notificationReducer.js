const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'NOTIFICATION':
      return action.data
    case 'RESET':
      return initialState
    default:
      return state
  }
}

let timer = 0
export const setNotifications = (toShow, seconds) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: toShow
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer