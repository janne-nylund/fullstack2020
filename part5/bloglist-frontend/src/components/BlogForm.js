import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
        Title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
        </div>
        <div>
        Author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        </div>
        <div>
        Url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm

/* const blogForm = () => {
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
} */