if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let mongoUrl = process.env.BLOG_DATABASE

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_BLOG_DATABASE
}

console.log('envs to connect', mongoUrl, port)
module.exports = {
  mongoUrl,
  port
}