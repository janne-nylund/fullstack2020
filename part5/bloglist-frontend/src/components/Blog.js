import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <p className='blogTitle'>{blog.title}</p>
    <b>Author: </b>{blog.author}<br/>
    <b>Url: </b>{blog.url}<br/> 
    <b>Likes: </b>{blog.likes}<br/>
    <small><b>CREATOR: </b>{blog.user.name}</small><br/><br/>
  </div>
)

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

