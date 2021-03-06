import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const hideWhenView = { display: showInfo ? 'none' : '' }
  const showWhenView = { display: showInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 10,
    marginTop: 10,
    lineHeight: 1.6,
    backgroundColor: '#eeeeee'
  }

  const showRemoveButton = () => {
    if(blog.user.username === user.username){
      return <Button variant="outline-danger" onClick={removeBlog}>Remove</Button>
    } else{
      return null
    }
  }

  return(
    <div style={blogStyle} className='blog'>

      <div style={hideWhenView} className='default'>
        <p className='blogTitle'>{blog.title} <Button  variant="outline-primary" onClick={() => setShowInfo(true)}>view</Button></p>
        <b>Author: </b>{blog.author}<br/>
      </div>
      <div style={showWhenView} className='onView'>
        <p className='blogTitle'>{blog.title} <Button   variant="outline-primary" onClick={() => setShowInfo(false)}>hide</Button></p>
        <b>Author: </b>{blog.author}<br/>
        <b>Url: </b>{blog.url}<br/>
        <b className='likes'>Likes: </b>{blog.likes} <Button  variant="outline-primary" onClick={addLike}>like</Button><br/>
        <b>Created by: </b>{blog.user.name}<br/>
        {showRemoveButton()}<br/>
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

