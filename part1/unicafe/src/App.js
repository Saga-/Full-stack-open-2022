import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  const handleBadClick = () => setBad(bad + 1);

  const calculateAverage = () => {
    const total = good + bad + neutral
    if (total === 0) {
      return 0
    }
    return (good - bad) / (good + bad + neutral);
  }

  const calculatePositive = () => {
    const total = good + bad + neutral
    if (total === 0) {
      return 0
    }
    return (good / total) * 100;
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
     </div>
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {calculateAverage()}</p>
        <p>positive {calculatePositive()} %</p>
      </div>
    </div>
  )
}

export default App
