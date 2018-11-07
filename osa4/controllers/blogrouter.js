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

blogRouter.get('/:id', async (request, response) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception){
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.post('/', async (request, response) => {
  try{
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

    const savedBlog = await blog.save()
    response.status(201).json(Blog.format(savedBlog))
  } catch(exception) {
    console.log('save failed')
    response.status(500).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  try{
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(Blog.format(updatedBlog))
  } catch (exception){
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogRouter
