const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//app.use(morgan('tiny'))
morgan.token('myname', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :myname :status :res[content-length] - :response-time ms'))

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Martti Tienari",
      number: "040-123456",
      id: 2
    },
    {
      name: "Arto Järvinen",
      number: "040-123456",
      id: 3
    },
    {
      name: "Lea Kutvonen",
      number: "040-123456",
      id: 4
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.get('/info', (req, res) => {
    console.log('time', Date.UTC())
    const now = new Date()
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><br/> ${now.toString()}`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    const newId = Math.floor(Math.random(1000000)*1000000)
    return newId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const search = persons.find(person => person.name === body.name)
  
    if (body.name === undefined) {
      return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined) {
      return response.status(400).json({error: 'number missing'})
    }
    if (search != undefined) {
      return response.status(400).json({error: 'name must be unique'})
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})