const initialState = ''
let timer = 0

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'NOTIFICATION':
      return action.data
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const setNotifications = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer