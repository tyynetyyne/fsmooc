import React from 'react'
import ReactDOM from 'react-dom'

function Statistic(props) {
    return (
        <tr><td>{props.teksti}: </td><td>{props.arvo} {props.yksikko}</td></tr>
    )
}

function StatisticsHelp(props) {
    if (props.yhteensa === 0)
        return <tr><td>Ei annettuja vastauksia</td></tr>;
    return (
        <>
            <Statistic teksti="Keskiarvo" arvo={props.keskiarvo} />
            <Statistic teksti="Positiivisia" arvo={props.positiivisia} yksikko="%" />
        </>
    )
}

function Statistics(props) {
    const kpl = props.hyva + props.neutraali + props.huono;
    return (
        <div>
            <h1>Statistiikka</h1>
            <table>
                <tbody>
                <Statistic teksti="Hyvä" arvo={props.hyva} />
                <Statistic teksti="Neutraali" arvo={props.neutraali} />
                <Statistic teksti="Huono" arvo={props.huono} />
                <StatisticsHelp yhteensa={kpl} keskiarvo={props.keskiarvo} positiivisia={props.positiivisia} /> 
                </tbody>
            </table>
        </div>
    )
}

function Button(props) {
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

    tilannemuutos = (tilamuuttuja) => {
        return () => {
            this.setState({ [tilamuuttuja]: this.state[tilamuuttuja] + 1 })
        }
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
        return this.pyorista(this.state.hyva / this.kaikki() * 100)
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Anna palautetta</h1>
                    <Button teksti="Hyvä" hoidaPainallus={this.tilannemuutos('hyva')} />
                    <Button teksti="Neutraali" hoidaPainallus={this.tilannemuutos('neutraali')} />
                    <Button teksti="Huono" hoidaPainallus={this.tilannemuutos('huono')} />
                </div>
                <div>
                    <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)