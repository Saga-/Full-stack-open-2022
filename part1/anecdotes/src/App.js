import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  // snippet from https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleAnecdoteClick = () => {
    // snippet from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const randomQuote = Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setSelected(randomQuote);
  }

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected]++
    setVotes(copy);
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleAnecdoteClick}>next anecdote</button>
    </div>
  )
}

export default App
