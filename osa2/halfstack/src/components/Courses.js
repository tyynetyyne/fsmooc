import React from 'react'

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

const Kurssi = (props) => {
    return (
        <div>
          <Otsikko kurssi={props.nimi} />
          <Sisalto osat={props.osat} />
          <Yhteensa osat={props.osat} />
        </div>      
    )
}

const Kurssit = ({kurssit}) => {
    return (
      <div>
       {kurssit.map(kurssi => <Kurssi nimi={kurssi.nimi} osat={kurssi.osat} key={kurssi.id} />)}
      </div>
    )
}

export default Kurssit