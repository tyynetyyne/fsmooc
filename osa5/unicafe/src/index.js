import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

function Clear(props) {
  return (
    <div>
      <button onClick={props.clearHandler}>nollaa</button>
    </div>
  );
}

function Statistic(props) {
  return (
    <tr>
      <td>{props.text}: </td>
      <td>
        {props.value} {props.unit}
      </td>
    </tr>
  );
}

function StatisticsHelp(props) {
  if (props.total === 0)
    return (
      <tr>
        <td>Ei annettuja vastauksia</td>
      </tr>
    );
  return (
    <>
      <Statistic text="Keskiarvo" value={props.mean} />
      <Statistic text="Positiivisia" value={props.positive} unit="%" />
    </>
  );
}

function Statistics(props) {
  const amount = props.good + props.ok + props.bad;
  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <Statistic text="Hyvä" value={props.good} />
          <Statistic text="Neutraali" value={props.ok} />
          <Statistic text="Huono" value={props.bad} />
          <StatisticsHelp
            total={amount}
            mean={props.mean}
            positive={props.positive}
          />
        </tbody>
      </table>
    </div>
  );
}

function Button(props) {
  return <button onClick={props.handleClick}>{props.text}</button>;
}

class App extends React.Component {
  all() {
    const state = store.getState();
    return state.good + state.ok + state.bad;
  }

  round(number) {
    return Math.round(number * 100) / 100;
  }

  mean() {
    const state = store.getState();
    if (this.all() === 0) return 0;
    return this.round((state.good - state.bad) / this.all());
  }

  positive() {
    const state = store.getState();
    if (this.all() === 0) return 0;
    return this.round((state.good / this.all()) * 100);
  }

  handleClear = () => {
    store.dispatch({ type: "ZERO" });
  };

  render() {
    const state = store.getState();
    return (
      <div>
        <div>
          <h1>Anna palautetta</h1>
          <Button
            text="Hyvä"
            handleClick={e => store.dispatch({ type: "GOOD" })}
          />
          <Button
            text="Neutraali"
            handleClick={e => store.dispatch({ type: "OK" })}
          />
          <Button
            text="Huono"
            handleClick={e => store.dispatch({ type: "BAD" })}
          />
        </div>
        <div>
          <Statistics
            good={state.good}
            ok={state.ok}
            bad={state.bad}
            mean={this.mean()}
            positive={this.positive()}
          />
          <Clear clearHandler={this.handleClear} />
        </div>
      </div>
    );
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
