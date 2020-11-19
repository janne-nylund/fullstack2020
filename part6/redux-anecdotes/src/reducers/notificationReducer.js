const initialState = ''

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

/* export const setNotifications = (notification) => {
  return {
    type: 'NOTIFICATION',
    data: notification
  }
} */

export const setNotifications = (notification, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch(clearNotifications())
    }, time * 1000)
  }
}

export const clearNotifications = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer