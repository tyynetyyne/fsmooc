const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const testData = require('./testdata')
const Blog = require('../models/blog')

beforeAll(async () => {
  await Blog.remove({})

  // testData.initialBlogs.forEach(async (blog) => {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  //   console.log('blog saved')
  // })

  const blogObjects = testData.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(testData.initialBlogs.length)
})

test('the first blog is written by', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].author).toBe('Michael Chan')
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(title).toContain('React patterns')
})

afterAll(() => {
  server.close()
})