const mongoose = require('mongoose')

const url = process.env.PHONE_DATABASE
//const url = "mongodb://********/@ds145463.mlab.com:45463/phonenumbers"

mongoose.connect(url, { useNewUrlParser: true })

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
