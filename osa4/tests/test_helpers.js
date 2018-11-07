const Blog = require('../models/blog')
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

module.exports = {
  nonExistingId, blogsInDb
}