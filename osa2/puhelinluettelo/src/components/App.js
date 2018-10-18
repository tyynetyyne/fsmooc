import React from 'react';
import personService from '../services/persons';

const Person = (props) => {
    return (
        <p>{props.name} : {props.number}</p>
    )
}

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map(pers => <Person name={pers.name} number={pers.number} key={pers.name} />)}
        </div>
    )
}

const InputField = ({ handler, state, name }) => {
    return (
        <div>
            {name}: <input value={state} onChange={handler} />
        </div>
    )
}

const Form = ({ submitHandler, fieldHandler, state }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                <h2>Lisää uusi</h2>
                <InputField name='nimi' state={state['newName']} handler={fieldHandler('newName')} />
            </div>
            <div>
                <InputField name='numero' state={state['newNumber']} handler={fieldHandler('newNumber')} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>

    )
}

function Exists(persons, name) {
    return (
        persons.map(p => p.name).includes(name)
    )
}

function Filter(persons, name) {
    return (
        persons.filter(p => p.name.includes(name))
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            newFilter: ''
        }
    }

    componentDidMount() {
        console.log('did mount')
        personService.getAll()
          .then(response => {
            console.log('promise fulfilled')
            this.setState({ persons: response.data })
          })
      }

    addPerson = (event) => {
  
        event.preventDefault();
        const tulos = Exists(this.state.persons, this.state.newName);
    
        if (!tulos) {
            const newPerson = { name: this.state.newName, number: this.state.newNumber }

            personService.create(newPerson)
            .then(response => {
              console.log(response)
              this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber: ''
            })
            console.log('nimi lisätty')
            })        
        } else {
            // console.log('on jo')
        }
    }


    handleChange = (field) => {
        return (event) => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            <div>

                <h2>Puhelinluettelo</h2>
                <div>
                    <InputField name='rajaa valintoja' state={this.state['newFilter']} handler={this.handleChange('newFilter')} />
                </div>
                <Form fieldHandler={this.handleChange} submitHandler={this.addPerson} state={this.state} />
                <h2>Numerot</h2>
                <Persons persons={Filter(this.state.persons, this.state.newFilter)} />
            </div>
        )
    }
}

export default App
