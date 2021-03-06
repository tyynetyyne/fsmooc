const supertest = require('supertest')
const app  = require('../app')
const api = supertest(app)
const testData = require('./testdata')
const Blog = require('../models/blog')
const helper = require('./test_helpers')
const User = require('../models/user')
const { nonExistingId, blogsInDb, usersInDb } = require('./test_helpers')

const mongoose = require('mongoose')
const config = require('../utils/config')

//describe.skip('user tests', () => {
describe.only('when there is initially one user at db', async () => {

  beforeAll(async () => {
    await mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = new User({
      username: 'root',
      password: 'sekret',
      adult: true,
      name: 'True Hacker' 
    })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
      adult: true
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique'})

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode and message if password too short', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'tyyppi',
      name: 'Antti Jussila',
      password: 'sa',
      adult: true
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must be at least 3 characters long' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users succeeds with a fresh username, without adult flag', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'juusela',
      name: 'Jussi Juusela',
      password: 'wtf'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const foundUser = usersAfterOperation.find(u => u.username === 'juusela')
    expect(foundUser.adult).toBe(true)
  })
})
