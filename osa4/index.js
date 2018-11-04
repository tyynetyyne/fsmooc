const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const Router = require('./controllers/blogrouter')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(express.static('build'))
app.use('/api/blogs', Router)
app.use(cors())
morgan.token('myname', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :myname :status :res[content-length] - :response-time ms'))

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
