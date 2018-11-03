if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')

const url = process.env.PHONE_DATABASE

mongoose.connect(url, { useNewUrlParser: true })
  .catch( () => {
    console.log('autentication failed')
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})


personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
