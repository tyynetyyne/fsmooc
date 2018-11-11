const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const middleware = require('./utils/middleware') 

const Blog = require('./models/blog')
const Router = require('./controllers/blogrouter')
const usersRouter = require('./controllers/userrouter')
const loginRouter = require('./controllers/login')
//const morgan = require('morgan')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)
app.use(middleware.tokenExtractor)
//morgan.token('myname', function (req) { return JSON.stringify(req.body) })
//app.use(morgan(':method :url :myname :status :res[content-length] - :response-time ms'))

app.use('/api/blogs', Router)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.error)

module.exports = app
