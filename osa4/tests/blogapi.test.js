const supertest = require('supertest')
const app  = require('../app')
const api = supertest(app)
const testData = require('./testdata')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helpers')
const mongoose = require('mongoose')
const config = require('../utils/config')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  await mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
})

afterAll(async () => {
  await mongoose.connection.close()
})

//describe.skip('post and get', () => {
beforeEach(async () => {
  
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = testData.testUser
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds)
  const newUserAndHash = { ...newUser,  passwordHash: passwordHash }
  const userObject = new User(newUserAndHash)
  const addedUser = await userObject.save()

  const testBlogs = testData.initialBlogs.map(b => {
    return { ...b,  user : addedUser.id }
  })

  for (let blog of testBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

async function loginTestUser(){
  try{
  const loginData = {
    username: testData.testUser.username,
    password: testData.testUser.password
  }

  const response = await api
    .post('/api/login')
    .send(loginData)

  return response.body.token
  } catch (exception){
    console.log('token error in login', exception)
  }
}

test('add new blog', async () => {
  const blogsBefore = await helper.blogsInDb()

  const newBlog = testData.newBlog

  const token = await loginTestUser()

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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

  const newBlog = testData.newBlogNoTitleNoUrl
  const token = await loginTestUser()
  
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter.length).toBe(blogsBefore.length)
})

test('add new blog without likes, set likes to zero', async () => {
  const blogsBefore = await helper.blogsInDb()

  const usersBefore = await helper.usersInDb()

  const newBlog = testData.newBlogNoLikes
  const token = await loginTestUser()

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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


test('a specific blog can be viewed', async () => {
  const resultAll = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const aBlogFromAll = resultAll.body[0]

  const resultBlog = await api
    .get(`/api/blogs/${aBlogFromAll.id}`)

  const blogObject = resultBlog.body

  expect(blogObject).toEqual(aBlogFromAll)
})

test('a blog can be deleted', async () => {
  const newBlog = testData.newBlog
  const token = await loginTestUser()
  
  const addedBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

  const blogsBefore = await helper.blogsInDb()
  await api
    .delete(`/api/blogs/${addedBlog.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAfter = await helper.blogsInDb()

  const ids = blogsAfter.map(b => b.id)

  expect(ids).not.toContain(newBlog.id)
  expect(blogsAfter.length).toBe(blogsBefore.length - 1)
})

test('a blog can be changed', async () => {

  const resultAll = await helper.blogsInDb()
  const token = await loginTestUser()
  const aBlogFromAll = resultAll[0]
  const changedBlog = { ...aBlogFromAll, likes: aBlogFromAll.likes + 1 }
  const blogsBefore = await helper.blogsInDb()
  
  await api
    .put(`/api/blogs/${aBlogFromAll.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(changedBlog)
    .expect(200)

  const blogsAfter = await helper.blogsInDb()
  const modifiedBlog = await api
    .get(`/api/blogs/${aBlogFromAll.id}`)

  expect(JSON.stringify(modifiedBlog.body)).toEqual(JSON.stringify(changedBlog))
  expect(blogsAfter.length).toBe(blogsBefore.length)
})

//})