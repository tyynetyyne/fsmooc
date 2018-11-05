const R = require('ramda')

const dummy = () => {
  return 1
}

const sum = (acc, cur) => acc + cur

const totalLikes = (blogs) => {
  //console.log('likes', blogs.map(b => b.likes))
  const likes = blogs.map(b => b.likes)
  //console.log('reduce', likes.reduce(sum, 0))
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
  const frequencies = R.countBy(blog => blog.author)(blogs)
  console.log('freq', frequencies)
  const maxFreq = Math.max(...Object.values(frequencies))
  console.log('maxFreq', maxFreq)
  const result = Object.keys(frequencies).map(key => {
    return [key, frequencies[key]]
  })
  console.log('result', result)
  const maxAuthor = result.find(r => {return r[1] === maxFreq})
  console.log('maxAuthor', maxAuthor)
  return {
    author: maxAuthor[0],
    blogs: maxFreq
  }
}  

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
