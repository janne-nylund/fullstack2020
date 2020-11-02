const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is a fancy blog',
    author: 'James Blog',
    url: 'www.blogs.com/1/',
    likes: 7,
    id: '5f9971ed6a8b8d151130aadd'
  },
  {
    title: 'Confessions of a Swimming Freak',
    author: 'Nancy Alvarez',
    url: 'www.blogs.com/2/',
    likes: 9,
    id: '5f9977e86a8b8d151130aadf'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/* const nonExistingId = async () => {
  const blog = new Blog({ title: 'blogwithoutid', author: 'empty', url: 'www.blogs.com/20/', likes: 9 })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
} */

module.exports = {
  initialBlogs, blogsInDb
}