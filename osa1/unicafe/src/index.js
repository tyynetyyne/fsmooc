import React from 'react'
import ReactDOM from 'react-dom'

function Statistic(props) {
    return (
        <li>{props.teksti}: {props.arvo} {props.yksikko}</li>
    )
}

function Statistics(props) {
    return (
        <div>
            <h1>Statistiikka</h1>
            <ul>
                <Statistic teksti="Hyvä" arvo={props.hyva} />
                <Statistic teksti="Neutraali" arvo={props.neutraali} />
                <Statistic teksti="Huono" arvo={props.huono} />
                <Statistic teksti="Keskiarvo" arvo={props.keskiarvo} />
                <Statistic teksti="Positiivisia" arvo={props.positiivisia} yksikko="%" />
            </ul>
        </div>
    )
}

function Button(props){
    return (
    <button onClick={props.hoidaPainallus}>
        {props.teksti}
    </button>
    )
}

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

    pyorista(luku) {
        return Math.round(luku * 100) / 100
    }

    keskiarvo() {
        if (this.kaikki() === 0)
            return 0
        return this.pyorista((this.state.hyva - this.state.huono) / this.kaikki())
    }

    positiivisia() {
        if (this.kaikki() === 0)
            return 0
        return this.pyorista(this.state.hyva / this.kaikki())
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Anna palautetta</h1>
                    <Button teksti="Hyvä" hoidaPainallus={this.hyva.bind(this)} />
                    <Button teksti="Neutraali" hoidaPainallus={this.neutraali.bind(this)} />
                    <Button teksti="Huono" hoidaPainallus={this.huono.bind(this)} />
                </div>
                <div>
                    <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} keskiarvo={this.keskiarvo()} positiivisia={this.state.hyva} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)