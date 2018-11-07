const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const testData = require('./testdata')
const Blog = require('../models/blog')
const helper = require('./test_helpers')

beforeEach(async () => {
  await Blog.remove({})

  // testData.initialBlogs.forEach(async (blog) => {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  //   console.log('blog saved')
  // })

  // const blogObjects = testData.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)

  for (let blog of testData.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('add new blog', async () => {
  const blogsBefore = await helper.blogsInDb()
  const newBlog = {
    title: 'Koodauksen ABC',
    url: 'http://koodauksenabc.blogspot.fi',
    author: 'Tiina Partanen',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()

  const titles = blogsAfter.map(b => b.title)

  expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  expect(titles).toContain('Koodauksen ABC')
})

test('add new blog without url and title', async () => {
  const blogsBefore = await helper.blogsInDb()
  const newBlog = {
    author: 'Tiina Partanen',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter.length).toBe(blogsBefore.length)
})

test('add new blog without likes, set likes to zero', async () => {
  const blogsBefore = await helper.blogsInDb()
  const newBlog = {
    title: 'Lietsufyke',
    url: 'http://lietsufyke.blogspot.fi',
    author: 'Tiina Partanen'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  expect(response.body.likes).toBe(0)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs.length).toBe(testData.initialBlogs.length)
})

test('the first blog is written by', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].author).toBe('Michael Chan')
})

test('a specific blog is within the returned blogs', async () => {
  const blogs = await helper.blogsInDb()

  const titles = blogs.map(r => r.title)

  expect(titles).toContain('React patterns')
})

afterAll(() => {
  server.close()
})