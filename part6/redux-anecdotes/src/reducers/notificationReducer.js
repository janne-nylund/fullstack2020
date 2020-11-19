const notificationReducer = (state = '', action) => {
  switch(action.type){
    case 'NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotifications = (notification) => {
  return {
    type: 'NOTIFICATION',
    data: notification
  }
}

export default notificationReducer