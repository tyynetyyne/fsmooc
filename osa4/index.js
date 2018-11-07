const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware') 
const config = require('./utils/config')
const Blog = require('./models/blog')
const Router = require('./controllers/blogrouter')
//const morgan = require('morgan')

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)
//morgan.token('myname', function (req) { return JSON.stringify(req.body) })
//app.use(morgan(':method :url :myname :status :res[content-length] - :response-time ms'))

app.use('/api/blogs', Router)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
