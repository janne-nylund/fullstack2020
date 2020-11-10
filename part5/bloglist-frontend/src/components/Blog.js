import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <h4>{blog.title}</h4>
    <b>Author: </b>{blog.author}<br/>
    <b>Url: </b>{blog.url}<br/> 
    <b>Likes: </b>{blog.likes}<br/>
    <small><b>CREATOR: </b>{blog.user.username}</small><br/><br/>
  </div>
)

export default Blog
