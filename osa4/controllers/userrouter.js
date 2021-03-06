const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if ((body.username === undefined) || body.username.length < 3 ) {
      return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    if ((body.password === undefined) || body.password.length < 3 ) {
      return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    //console.log('passwordHash userRouterissa', passwordHash)

    const user = new User({
      username: body.username,
      name: body.name === undefined ? '' : body.name,
      passwordHash: passwordHash,
      adult: body.adult === undefined ? true : body.adult,
      blogs: []
    })

    const savedUser = await user.save()

    //console.log('savedUser juuri saven jälkeen', savedUser)

    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { author: 1, title: 1, url: 1, likes: 1 } )
  response.json(users.map(User.format))
})

module.exports = usersRouter