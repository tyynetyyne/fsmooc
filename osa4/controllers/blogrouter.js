const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(blogs.map(Blog.format))
  } catch (exception) {
    console.log(exception)
    response.status(404).end()
  }
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)

    if (
      blog.user === undefined ||
      decodedToken.id.toString() === blog.user.toString()
    ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).send({ error: 'not authorized' })
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(400).send({ error: 'malformatted id' })
    }
  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    if (body.url === undefined) {
      return response.status(400).json({ error: 'url missing' })
    }
    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }
    if (body.author === undefined) {
      return response.status(400).json({ error: 'author missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log('save failed')
      response.status(500).end()
    }
  }
})

blogRouter.put('/:id', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const storedBlog = await Blog.findById(request.params.id)

    const body = request.body

    const blogFullUpdate = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    }

    const blogOnlyLikesChanged = { ...storedBlog._doc, likes: body.likes }

    if (decodedToken.id.toString() === storedBlog.user.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blogFullUpdate,
        { new: true }
      )
      response.status(200).json(Blog.format(updatedBlog))
    } else {
      //response.status(400).send({ error: 'not authorized' })
      // console.log('not the user', blogOnlyLikesChanged)
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blogOnlyLikesChanged,
        { new: true }
      )
      response.status(200).json(Blog.format(updatedBlog))
    }
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogRouter
