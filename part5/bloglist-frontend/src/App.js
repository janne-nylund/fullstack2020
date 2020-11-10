import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    /* blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`New blog: ${newTitle}, by ${newAuthor}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
      .catch(error => {
        setErrorMessage(
          `Error adding blog`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)
      }) */

      try {
        const resp = await blogService.create(blogObject)
        setBlogs(blogs.concat(resp))
        setSuccessMessage(`New blog: ${newTitle}, by ${newAuthor}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      } catch (exception) {
        setErrorMessage('Error adding blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)
      }
   
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logOut = () => {
    setSuccessMessage(`${user.username} logged out`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const showBlogs = () => (
    <div>
      <p>{user.name} logged-in<input type='button' value='logout' onClick={logOut}/></p>
      <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <div>
        Title:
        <input
        type="text"
        value={newTitle}
        name="Title"
        onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
        type="text"
        value={newAuthor}
        name="Author"
        onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
        type="text"
        value={newUrl}
        name="Url"
        onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">CREATE</button>
    </form>  
        <>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      </div>
  )

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={successMessage} cssSelector = 'notification' />
      <Notification message={errorMessage} cssSelector = 'error' />
      {user === null ?
      loginForm() :
      showBlogs()
      }
    </div>
  )
}

export default App