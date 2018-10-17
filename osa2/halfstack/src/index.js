import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi}</h1>
      </div>
    )
}

const Osa = (props) => {
  return (
    <div>
    <p>{props.nimi} {props.tehtavia}</p>
    </div>
  )
}

const Sisalto = ({osat}) => {
    return (
      <div>
          {osat.map(osa => <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} key={osa.id} />)}
      </div>
    )
}

function summa(yhteensa, luku) {
    return yhteensa + luku;
}

const Yhteensa = ({osat}) => {
    return (
      <div>
        <p>yhteensä {osat.map(osa => osa.tehtavia).reduce(summa)} tehtävää</p>
      </div>
    )
}

const Kurssi = ({kurssi}) => {
    return (
        <div>
          <Otsikko kurssi={kurssi.nimi} />
          <Sisalto osat={kurssi.osat} />
          <Yhteensa osat={kurssi.osat} />
        </div>      
    )
}

const App = () => {
 
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          },
          {
            nimi: 'Redux',
            tehtavia: 7,
            id: 4
          }
        ]
      }
    
      return (
        <div>
          <Kurssi kurssi={kurssi} />
        </div>
      )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
