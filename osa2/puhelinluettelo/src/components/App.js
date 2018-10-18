import React from 'react';

const Person = (props) => {
    return (
    <p>{props.name} : {props.number}</p>
    )
}

const Persons = ({persons}) => {
    return (
        <div>
        {persons.map(pers => <Person name={pers.name} number={pers.number} key={pers.name}/>)}
        </div>
    )
}

function Exists(persons, name){
    return (
        persons.map(p => p.name).includes(name)
    )
}

function Filter(persons, name){
    return (
        persons.filter(p => p.name.includes(name))
    )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '050-3429322'},
        { name: 'Lea Kutvo',  number: '050-3420320'}
      ],
      newName: '',
      newNumber: '',
      newFilter: ''
    }
  }


addPerson = (event) => {
    event.preventDefault();
    const tulos = Exists(this.state.persons, this.state.newName); 
    // console.log('testi', tulos);
    if(! tulos){
        const newPerson = {name: this.state.newName, number: this.state.newNumber}
        const persons = this.state.persons.concat(newPerson)

        this.setState({
            persons: persons,
            newName: '',
            newNumber: ''
        })
        // console.log('nimi lisätty')
    } else {
    // console.log('on jo')
    }
}


handleChange = (field) => {
    return (event) => this.setState( {[field]: event.target.value})
}

  render() {
    return (
      <div>
        
        <h2>Puhelinluettelo</h2>
        <div>
            rajaa valintoja: 
            <input value={this.state.newFilter} onChange={this.handleChange('newFilter')} />
        </div>
        <form onSubmit={this.addPerson}>
          <div>
            <h2>Lisää uusi</h2>
            nimi: <input value={this.state.newName} onChange={this.handleChange('newName')} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleChange('newNumber')} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons persons={Filter(this.state.persons, this.state.newFilter)} />
      </div>
    )
  }
}

export default App
