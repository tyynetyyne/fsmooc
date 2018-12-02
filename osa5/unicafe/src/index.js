import React from "react";
import ReactDOM from "react-dom";

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
  const amount = props.good + props.neutral + props.bad;
  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <Statistic text="Hyvä" value={props.good} />
          <Statistic text="Neutraali" value={props.neutral} />
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
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    };
  }

  statechange = statevariable => {
    return () => {
      this.setState({ [statevariable]: this.state[statevariable] + 1 });
    };
  };

  all() {
    return this.state.good + this.state.neutral + this.state.bad;
  }

  round(number) {
    return Math.round(number * 100) / 100;
  }

  mean() {
    if (this.all() === 0) return 0;
    return this.round((this.state.good - this.state.bad) / this.all());
  }

  positive() {
    if (this.all() === 0) return 0;
    return this.round((this.state.good / this.all()) * 100);
  }

  handleClear = () => {
    this.setState({ good: 0, neutral: 0, bad: 0 });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Anna palautetta</h1>
          <Button text="Hyvä" handleClick={this.statechange("good")} />
          <Button text="Neutraali" handleClick={this.statechange("neutral")} />
          <Button text="Huono" handleClick={this.statechange("bad")} />
        </div>
        <div>
          <Statistics
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            mean={this.mean()}
            positive={this.positive()}
          />
          <Clear clearHandler={this.handleClear} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
