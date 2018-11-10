const Blog = require('../models/blog')
const User = require('../models/user')
//const testData = require('./testdata')

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(User.format)
}

// function formatBlogId(blog){
//   return {
//     author: blog.author,
//     title: blog.title,
//     url: blog.url,
//     likes: blog.likes,
//     id: blog.id.toString()
//     }
// }

module.exports = {
  nonExistingId, blogsInDb, usersInDb
}