const mongoose = require('mongoose')

const url = process.env.PHONE_DATABASE
//const url = 'mongodb://********/@ds145463.mlab.com:45463/phonenumbers'

console.log('printing something')

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: Number
})

if(process.argv.length < 3){
  Person
    .find({})
    .then(result => {
      console.log('Puhelinluettelo:')
      result.forEach(pers => {
        console.log(pers.name,pers.number)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  person
    .save()
    .then( () => {
      console.log('lisätään henkilö', person.name, 'numero', person.number, 'luetteloon')
      mongoose.connection.close()
    })
}