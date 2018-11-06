const R = require('ramda')

const dummy = () => {
  return 1
}

function sum(acc, cur){
  return acc + cur
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  return likes.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  if(likes.length === 0){
    return false
  }
  const maxlikes = Math.max(...likes)
  const bestblog = blogs.find(b => b.likes === maxlikes)
  return {
    author: bestblog.author,
    title: bestblog.title,
    likes: bestblog.likes
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return false
  }
  const frequencies = R.countBy(blog => blog.author)(blogs)
  const maxFreq = Math.max(...Object.values(frequencies))
  const result = Object.keys(frequencies).map(key => {
    return [key, frequencies[key]]
  })
  const maxAuthor = result.find(r => {return r[1] === maxFreq})
  return {
    author: maxAuthor[0],
    blogs: maxFreq
  }
}  

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return false
  }

  const frequencies = R.countBy(blog => blog.author)(blogs)
  const names = Object.keys(frequencies)
  const likesPerName = names.map(name => {
    return [ name, blogs
      .filter(blog => {return blog.author === name})
      .map(blog => {return blog.likes})
      .reduce(sum, 0)
    ]
  })
  const maxLikes = Math.max(...likesPerName.map(likes => likes[1]))
  const mostPopular = likesPerName.find(stat => {return stat[1] === maxLikes})
  return {
    author: mostPopular[0],
    likes: mostPopular[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
