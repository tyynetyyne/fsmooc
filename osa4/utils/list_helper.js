const dummy = () => {
  return 1
}

const sum = (acc, cur) => acc + cur

const totalLikes = (blogs) => {
  //console.log('likes', blogs.map(b => b.likes))
  const likes = blogs.map(b => b.likes)
  if(likes.length === 0){
    return 0
  }
  if(likes.length === 1){
    return likes[0]
  }
  //console.log('reduce', likes.reduce(sum, 0))
  return likes.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  if(likes.length === 0){
    return 0
  }
  if(likes.length === 1){
    return {
      author: blogs[0].author,
      title: blogs[0].title,
      likes: blogs[0].likes
    }
  }
  const maxlikes = Math.max(...likes)
  const bestblog = blogs.find(b => b.likes === maxlikes)
  return {
    author: bestblog.author,
    title: bestblog.title,
    likes: bestblog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
