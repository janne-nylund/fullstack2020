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
  /* console.log(array.length === 0
    ? { author: 'No blogs found' }
    : {
      'title': blog.title,
      'author': blog.author,
      'likes': blog.likes
    }
  ) */
  return array.length === 0
    ? { author: 'No blogs found' }
    : {
      'title': blog.title,
      'author': blog.author,
      'likes': blog.likes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}