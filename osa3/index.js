const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
const bodyParser = require('body-parser')
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
//app.use(morgan('tiny'))
morgan.token('myname', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :myname :status :res[content-length] - :response-time ms'))

app.get('/', (request, response) => {
response.send('<h1>Puhelinluettelo</h1><p>/info, /api/persons, /api/persons/:id</p>')
})

app.get('/api/persons', (request, response) => {
Person
.find({})
.then(result => {
if(result){
  response.json(result.map(Person.format))
}
  response.status(404).end()
})
})

app.get('/api/persons/:id', (request, response) => {
const id = request.params.id
Person
.findById(id)
.then(person => {
  response.json(Person.format(person))
})
.catch(error => {
  //console.log(error)
  response.status(404).end()
})
})

app.get('/info', (req, res) => {
//console.log('time', Date.UTC())
const now = new Date()
Person
.find({})
.then(result => {
if(result){
  res.send(`<p>puhelinluettelossa ${result.length} henkilön tiedot</p><br/> ${now.toString()}`)
}
response.status(404).end()
})
})

app.delete('/api/persons/:id', (request, response) => {
const id = request.params.id

Person
.findByIdAndRemove(id)
.then(result => {
      response.status(204).end()
})      
.catch(error => {
    response.status(400).send({ error: 'malformatted id' })
})
})

app.post('/api/persons', (request, response) => {
const body = request.body
var search = false

if (body.name === undefined) {
  return response.status(400).json({error: 'name missing'})
}
if (body.number === undefined) {
  return response.status(400).json({error: 'number missing'})
}

Person
  .find({name: body.name})
  .then(result => {
    console.log('etsintää', result)
    if(result.length === 0){
      const person = new Person({
        name: body.name,
        number: body.number
      })
      person
        .save()
        .then(savedPerson => {
            response.json(Person.format(savedPerson))
          })
        .catch(error => {
            console.log('error in saving')
            response.status(400).json({error: 'database error'})
          })
    } else {
      return response.status(409).json({error: 'database error, exits already'})
    }
  })  
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }
  console.log('person ennen tallennusta', person)
  console.log('body ennen tallennusta', body)
  
  Person
    .findOneAndUpdate({_id: request.params.id}, person, { new: true })
    .then(updatedPerson => {
      console.log('palasi', updatedPerson)
      response.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})