import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    color: 'green',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 20
  }
  if( notification === ''){
    return (<></>)
  } else {
    return (
      <div style={style}>{notification}</div>
    )
  }
}

export default Notification