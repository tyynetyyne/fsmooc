import React from 'react'
import ReactDOM from 'react-dom'

function Button(props) {
    return (
        <button onClick={props.hoidaPainallus}>
            {props.teksti}
        </button>
    )
}

function Eniten(props) {
    return (
        <div>
        <h1>Eniten ääniä on saanut:</h1>
            {props.teksti}<br />
            {props.kpl} ääntä
        </div>
    )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

uusi(){
   return Math.floor(Math.random() * anecdotes.length) 
}

tilannemuutos(){
   this.setState({ selected: this.uusi()});
}

aanestys(){
    const kopio = [...this.state.votes];
    kopio[this.state.selected] += 1;
    /* console.log("selected:", this.state.selected); */
    this.setState({ votes : kopio});
 }
 
 voittaja(){
     return Math.max(...this.state.votes)
 }

  render() {
    const maksimi = this.voittaja();
    const index = this.state.votes.indexOf(maksimi);
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} <br />
        Ääniä: {this.state.votes[this.state.selected]} <br />
        <Button teksti="Äänestä" hoidaPainallus={this.aanestys.bind(this)} />
        <Button teksti="Seuraava" hoidaPainallus={this.tilannemuutos.bind(this)} />
        <Eniten teksti={anecdotes[index]} kpl={maksimi} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
