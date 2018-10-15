import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  hyva() {
    this.setState({ hyva: this.state.hyva + 1 })
  }

  neutraali() {
    this.setState({ neutraali: this.state.neutraali + 1 })
  }

  huono() {
    this.setState({ huono: this.state.huono + 1 })
  }

 kaikki() {
    return this.state.hyva + this.state.neutraali + this.state.huono
 }
 
 pyorista(luku){
     return Math.round(luku * 100) / 100
 }

 keskiarvo() {
    if(this.kaikki() === 0)
    return 0
    return this.pyorista((this.state.hyva - this.state.huono) / this.kaikki())
  }

positiivisia() {
    if(this.kaikki() === 0)
    return 0
    return this.pyorista(this.state.hyva / this.kaikki())
  }

  render() {
    return (
      <div>
        <div>
        <h1>Anna palautetta</h1>
          <button onClick={this.hyva.bind(this)}>
            Hyvä
          </button>
          <button onClick={this.neutraali.bind(this)}>
            Neutraali
          </button>
          <button onClick={this.huono.bind(this)}>
            Huono
          </button>
        </div>
        <div>
        <h1>Statistiikka</h1>
        <ul>
            <li>Hyvä: {this.state.hyva}</li>
            <li>Neutraali: {this.state.neutraali}</li> 
            <li>Huono: {this.state.huono}</li>
            <li>Keskiarvo: {this.keskiarvo()} </li>
            <li>Positiivisia: {this.positiivisia()} % </li>
        </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)