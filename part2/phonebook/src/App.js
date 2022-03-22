import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNewNameClick = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const renderNumbers = () => {
    return persons.map(person => <div key={person.name}>{person.name}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={handleNewNameClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderNumbers()}
    </div>
  )
}

export default App
