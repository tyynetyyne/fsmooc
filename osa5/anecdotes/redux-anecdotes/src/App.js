import React from "react";

class App extends React.Component {
  vote = id => {
    this.props.store.dispatch({
      type: "VOTE",
      data: {
        id: id
      }
    });
  };

  addAnecdote = event => {
    event.preventDefault();
    this.props.store.dispatch({
      type: "ADD",
      data: { content: event.target.text.value }
    });
    event.target.text.value = "";
  };

  render() {
    const anecdotes = this.props.store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a1, a2) => {
            return a2.votes - a1.votes;
          })
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={e => this.vote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name="text" />
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default App;
