const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

//console.log('createServer', app)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  console.log('connection close')
  mongoose.connection.close()
})


