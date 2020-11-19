const reducer = (state = '', action) => {
  switch(action.type){
    case 'NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'NOTIFICATION',
    data: notification
  }
}

export default reducer