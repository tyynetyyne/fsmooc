import React from 'react';
import personService from '../services/persons';
import './puhelinluettelo.css';

const DelButton = ({deleteHandler, id}) => {
    return (
        <button onClick={deleteHandler(id)}>
            Poista
        </button>
    )
}

const Person = (props) => {
    return (
        <p>{props.name} : {props.number} <DelButton id={props.id} deleteHandler={props.deleteHandler}/></p>
    )
}

const Persons = ({ persons, deleteHandler }) => {
    return (
        <div>
            {persons.map(pers => <Person name={pers.name} number={pers.number} key={pers.name} id={pers.id} deleteHandler={deleteHandler}/>)}
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

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={type}>
        {message}
      </div>
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
            newFilter: '',
            error: null,
            info: null
        }
    }

    componentDidMount() {
        // console.log('did mount')
        personService.getAll()
          .then(response => {
            // console.log('promise fulfilled')
            this.setState({ persons: response.data })
          })
      }

    handleAdd(tulos, newPerson){
        console.log('add alkaa', tulos, newPerson)
        if (!tulos) {
            personService.create(newPerson)
            .then(response => {
            //   console.log(response)
              this.setState({
                persons: this.state.persons.concat(response.data),
                info: `Henkilön ${this.state.newName} tiedot lisättiin palvelimelle`,
                newName: '',
                newNumber: ''
            })
            setTimeout(() => {
                this.setState({info: null})
              }, 5000)
            })        
        } else {
            const existingId = this.state.persons[this.state.persons.findIndex(p => p.name === this.state.newName)].id;
            if (window.confirm(`Henkilö ${this.state.newName} on jo luettelossa. Tallennetaanko uusi numero?`)) { 
                personService.update(existingId, newPerson)
                .then(response => {
                    // console.log('addPerson change', response);
                    this.setState({
                        info: `Henkilön ${this.state.newName} tiedot päivitettiin palvelimelle`,
                        persons: this.state.persons.map(p => p.id !== response.data.id ? p : response.data),
                        newName: '',
                        newNumber: ''
                    })
                    setTimeout(() => {
                        this.setState({info: null})
                      }, 5000)
                })
                .catch(error => {
                    console.log('poistettu henkilö!!!');
                    this.setState({
                        error: `Henkilö ${this.state.newName} on poistettu palvelimelta, lisätään se nyt uudelleen`,
                        persons: this.state.persons.filter(p => p.id !== existingId),
                        newName: '',
                        newNumber: ''
                    })
                    setTimeout(() => {
                        this.setState({error: null})
                      }, 5000)
                    this.handleAdd(false, newPerson)
                })         
            } else {
                console.log('else haara');
                this.setState({
                    info: `Henkilön ${this.state.newName} tietoja ei päivitetty`,
                    newName: '',
                    newNumber: ''
                })
                setTimeout(() => {
                    this.setState({info: null})
                  }, 5000)
            }
        }
    }

    addPerson = (event) => {
  
        event.preventDefault();
        const tulos = Exists(this.state.persons, this.state.newName);
        const newPerson = { name: this.state.newName, number: this.state.newNumber };

        this.handleAdd(tulos, newPerson)
    }

    handleDelete(id){
        return (
            () => {
            const name = this.state.persons[this.state.persons.findIndex(p => p.id === id)].name
            if (window.confirm(`Haluatko poistaa ${name} luettelosta?`)) { 
                personService.remove(id)
                .then(response => {
                    // console.log('handleDelete', response)
                    this.setState({
                        info: `Henkilö ${name} poistettiin palvelimelta`,
                        persons: this.state.persons.filter(p => p.id !== id)
                    })
                    setTimeout(() => {
                        this.setState({info: null})
                      }, 5000)
                })
                .catch(error => {
                    console.log('on jo poistettu henkilö!!!');
                    this.setState({
                        error: `Henkilö ${name} on jo poistettu palvelimelta`,
                        persons: this.state.persons.filter(p => p.id !== id)
                    })
                    setTimeout(() => {
                        this.setState({error: null})
                      }, 5000)
                })         
            }
        })
    }

    handleChange = (field) => {
        return (event) => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            <div>

                <h2>Puhelinluettelo</h2>
                <div>
                    <Notification message={this.state.error} type="error"/>
                    <Notification message={this.state.info} type="info"/>
                </div>
                <div>
                    <InputField name='rajaa valintoja' state={this.state['newFilter']} handler={this.handleChange('newFilter')} />
                </div>
                    <Form fieldHandler={this.handleChange} submitHandler={this.addPerson} state={this.state} />
                <h2>Numerot</h2>
                    <Persons persons={Filter(this.state.persons, this.state.newFilter)} deleteHandler={this.handleDelete.bind(this)} />
            </div>
        )
    }
}

export default App
