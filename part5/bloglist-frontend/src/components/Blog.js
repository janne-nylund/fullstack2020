import React, {useState} from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
const [showInfo, setShowInfo] = useState(false)

const hideWhenView = { display: showInfo ? 'none' : '' }
const showWhenView = { display: showInfo ? '' : 'none' }

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  marginRight: 10,
  marginTop: 10
}

const showRemoveButton = ()=>{
  if(blog.user.username === user.username){
    return <button onClick={removeBlog}>Remove</button>
  } else{
    return null
  }
}

return(
  <div style={blogStyle}>

  <div style={hideWhenView}>
    <p className='blogTitle'>{blog.title} <button onClick={() => setShowInfo(true)}>view</button></p>
  </div>
  <div style={showWhenView}>
    <p className='blogTitle'>{blog.title} <button onClick={() => setShowInfo(false)}>hide</button></p>
    <b>Author: </b>{blog.author}<br/>
    <b>Url: </b>{blog.url}<br/> 
    <b>Likes: </b>{blog.likes} <button onClick={addLike}>like</button><br/>
    <b>Created by: </b>{blog.user.name}<br/><br/>
    {showRemoveButton()}
  </div>

  </div>
  )
}

export default Blog

/* import React from 'react'
const Blog = ({ blog, user }) => {
  const showDeleteButton = ()=>{
    if(blog.user.username === user.username){
      return <button>Delete</button>
    } else{
      return null
    }
  }
  return (
  <div>
    <p className='blogTitle'>{blog.title}</p>
    <b>Author: </b>{blog.author}<br/>
    <b>Url: </b>{blog.url}<br/> 
    <b>Likes: </b>{blog.likes}<br/>
    <small><b>CREATOR: </b>{blog.user.username}</small><br/><br/>
    {showDeleteButton()}
  </div>
  )
}

export default Blog */

