const reducer = (state = '', action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let timer = 0
export const setNotifications = (toShow, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: toShow
    })
  clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: ''
      })
    }, seconds * 1000)
}
}
export default reducer