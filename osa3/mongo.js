const mongoose = require('mongoose')

url = process.env.PHONE_DATABASE

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: Number
})

module.exports = Note

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
  .then(response => {
    console.log('lisätään henkilö', person.name, 'numero', person.number, 'luetteloon')
    mongoose.connection.close()
  })
}