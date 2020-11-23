import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { Table, Button } from 'react-bootstrap'
// import { Table, Form, Button } from 'react-bootstrap'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  /*  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null) */
  //const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    blogService.getAllUsers().then(users =>
      setUsers( users )
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

  const notifyWith = (message, type='success') => {
    const notificationObj = { message, type }
    dispatch(setNotification(
      notificationObj, 5
    ))
  }

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
      notifyWith(`${user.name} welcome back!`)
    } catch (exception) {
      notifyWith('Wrong username/password!', 'error')
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`New blog: ${returnedBlog.title}, by ${returnedBlog.author}`)
      })
      .catch(error => {
        notifyWith('Error adding blog: ' + error)
        console.log(error)
      })
  }

  const addLikeTo = (id) => {
    const selectedBlog = blogs.find(b => b.id === id)
    const changedBlog = {
      user: selectedBlog.user.id,
      likes: (selectedBlog.likes + 1),
      author: selectedBlog.author,
      title: selectedBlog.title,
      url: selectedBlog.url
    }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        returnedBlog.user = selectedBlog.user
        setBlogs(blogs.map(blog => blog.id !== selectedBlog.id ? blog : returnedBlog))
        /* setSuccessMessage(`Like added to: ${returnedBlog.title}, by ${returnedBlog.author}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500) */
      })
      .catch(error => {
        console.log(error)
      })


  }

  const removeSelectedBlog = (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete "${blogToRemove.title}", by ${blogToRemove.author}?`)){
      blogService
        .remove(id)
        .then( () => {
          setBlogs(blogs.filter(b => b.id !== id))
          notifyWith(`Blog "${blogToRemove.title}" was removed`)
        })
        .catch((error) => {
          notifyWith('Error removing blog: ' + error)
          console.log(error)
        })
    }
  }

  const logOut = () => {
    notifyWith(`${user.name} logged out`)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    window.location = 'http://localhost:3000/'
  }
  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortByLike = (a, b) => {
    return b.likes - a.likes
  }

  const sortByBlogs = (a, b) => {
    return b.blogs.length - a.blogs.length
  }

  const padding = {
    padding: 5,
    marginTop: 10,
    marginRight: 15
  }
  const paddingButton = {
    padding: 5,
    marginTop: 10
  }

  const showBlogs = () => (
    <div className="container">
      <Link style={padding} to="/"><b>HOME</b></Link>
      <Link style={padding} to="/users"><b>USERS</b></Link>
      {user.name} logged in <Button style={paddingButton} variant="primary" onClick={logOut}>logout</Button>

      <h1>BLOGS</h1>
      <div>{blogForm()}</div>
      <>
        {blogs.sort(sortByLike).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={() => addLikeTo(blog.id)}
            user={user}
            removeBlog={() => removeSelectedBlog(blog.id)}
          />
        )}
      </>
    </div>
  )
  const UsersList = () => (
    <div>
      <Table striped>
        <tbody>
          <tr><td><b>name</b></td><td><b>blogs created</b></td></tr>
          {users.sort(sortByBlogs).map(user =>
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

  const showUsers = () => (
    <div className="container">
      <Link style={padding} to="/"><b>HOME</b></Link>
      <Link style={padding} to="/users"><b>USERS</b></Link>
      {user.name} logged in <Button style={paddingButton} variant="primary" onClick={logOut}>logout</Button>

      <h1>BLOGS</h1>
      <h3>USERS</h3>
      <UsersList />
    </div>
  )

  const Users = () => (
    <div>
      {user === null ?
        loginForm() :
        showUsers()
      }
    </div>
  )

  return (
    <div className="container">


      <Router>

        <Notification />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {user === null ?
              loginForm() :
              showBlogs()
            }
          </Route>
        </Switch>

      </Router>
    </div>
  )
}

export default App