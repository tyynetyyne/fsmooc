const logger = (request, response, next) => {
  if ( process.env.NODE_ENV === 'test' ) {
    return next()
  }
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  //console.log('extractor', authorization)
  request.token = (authorization && authorization.toLowerCase().startsWith('bearer ')) ?
    authorization.substring(7) :  null
  //console.log('extractor token', request.token)
  next()
}

module.exports = {
  logger,
  error,
  tokenExtractor
}