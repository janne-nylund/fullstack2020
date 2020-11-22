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

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const showBlogs = () => (
    <div>
      <p>{user.name} logged in<input type='button' value='logout' onClick={logOut}/></p>
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

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification />
      {user === null ?
        loginForm() :
        showBlogs()
      }
    </div>
  )
}

export default App