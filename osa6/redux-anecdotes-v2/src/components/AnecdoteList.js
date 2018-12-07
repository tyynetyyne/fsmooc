import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() =>
                    this.props.store.dispatch(anecdoteVoting(anecdote.id))
                  }
                >
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default AnecdoteList
