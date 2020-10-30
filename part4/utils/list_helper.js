const _ = require('lodash')
const array = require('lodash/array')
const object = require('lodash/fp/object')

const dummy = () => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = array => {
  const reducer = (max, item) => {
    return Math.max(max, item.likes)
  }

  const mostLikes = array.reduce(reducer, 0)
  const blog = array.find(item => item.likes === mostLikes)

  return array.length === 0
    ? { author: 'No blogs found' }
    : {
      'title': blog.title,
      'author': blog.author,
      'likes': blog.likes
    }
}

const mostBlogs = array => {
  var result = _(array)
    .countBy('author')
    .entries('title')
    .maxBy(_.last)

  return array.length === 0
    ? { author: 'No blogs found' }
    : {
      'author': result[0],
      'blogs': result[1]
    }
}

const mostLikes = array => {
  var result = _(array)
    .countBy('author')
    .entries('title')
    .maxBy(_.last)

  return array.length === 0
    ? { author: 'No blogs found' }
    : {
      'author': result[0],
      'blogs': result[1]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}