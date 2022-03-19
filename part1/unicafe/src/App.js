import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text={'good'} />
        <Button onClick={handleNeutralClick} text={'neutral'} />
        <Button onClick={handleBadClick} text={'bad'} />
     </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const avg = total === 0 ? 0 : (good - bad) / total;
  // Turn to string to render % symbol in child
  const positive = total === 0 ? 0 : (good / total) * 100;
  const header = <h1>statistics</h1>

  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        {header}
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      {header}
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={total} />
      <StatisticLine text={'average'} value={avg} />
      <StatisticLine text={'positive '} value={positive + ' %'} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ value, text }) => {
  return (
    <div>{text} {value} </div>
  )
}

export default App
