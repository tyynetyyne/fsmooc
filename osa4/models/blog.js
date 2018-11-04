const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoUrl = process.env.BLOG_DATABASE

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .catch( () => {
    console.log('database login failed')
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.statics.format = function(blog){
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog