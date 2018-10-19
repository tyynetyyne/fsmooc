import React from 'react';
import countryService from '../services/countries';
import './countries.css';

const Country = ({name, selectHandler}) => {
    return (
        <div onClick={selectHandler}>{name} </div>
    )
}

const CountryInfo = ({name, population, capital, flag}) => {
    return (
        <div>
        <h1>{name} </h1>
        <p>capital: {capital}</p>
        <p>population: {population}</p>
        <img src={flag} className="resize" alt="Country flag" />
        </div>
    )
}

const OnlyCountries = ({ countries, selectHandler} ) => {
     return (
    <div>
            {countries.map(item => <Country name={item.name} selectHandler={selectHandler(item.name)} key={item.name}/>)}
    </div> 
     )
}

const Countries = ({ countries, selectHandler}) => {
    const amount = countries.length
    if(amount === 1){
        // console.log('Vain yksi')
        return (
        <div>
            <CountryInfo name={countries[0].name} flag={countries[0].flag} capital={countries[0].capital} population={countries[0].population}/>
        </div> )
    } else if(amount <= 10){
        // console.log('Alle kymmenen')
        return ( 
        <div>
            <OnlyCountries countries={countries} selectHandler={selectHandler} />
        </div>)
    } else {
        // console.log('liikaa')
        return (
            <div>
                Liikaa maita, tarkenna hakua
            </div>
        )
    }
}

const InputField = ({ handler, state, name }) => {
    return (
        <div>
            {name}: <input value={state} onChange={handler} />
        </div>
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

function Filter(countries, name) {
    return (
        countries.filter(p => p.name.includes(name))
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            newFilter: '',
            error: null,
            info: null
        }
    }

    selectHandler(name){
        return () => {
            // console.log('valittu')
            this.setState({newFilter: name})
        }
    }

    componentDidMount() {
        // console.log('did mount')
        countryService.getAll()
          .then(response => {
            // console.log('promise fulfilled')
            this.setState({ countries: response.data })
          })
      }

    handleChange = (field) => {
        return (event) => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            <div>
                <div>
                    <Notification message={this.state.error} type="error"/>
                    <Notification message={this.state.info} type="info"/>
                </div>
                <div>
                    <InputField name='find countries' state={this.state['newFilter']} handler={this.handleChange('newFilter')} />
                </div>
                    <Countries countries={Filter(this.state.countries, this.state.newFilter)} selectHandler={this.selectHandler.bind(this)} />
            </div>
        )
    }
}

export default App
