const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(Blog.format))
  } catch (exception) {
    console.log(exception)
    response.status(404).end()
  }
})

blogRouter.get('/:id', (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(Blog.format(blog))
      } else {
        response.status(404).end()
      }
    })
    .catch( () => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

blogRouter.delete('/:id', (request, response) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch( () => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

blogRouter.post('/', (request, response) => {
  const body = request.body
  console.log('adding', request.body)
  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' })
  }
  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (body.author === undefined) {
    return response.status(400).json({ error: 'author missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })
  blog
    .save()
    .then(result => {
      response.status(201).json(Blog.format(result))
    })
    .catch( () => {
      console.log('save failed')
    })
})

blogRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(Blog.format(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = blogRouter
