import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewPersonClick = (e) => {
    e.preventDefault();
    const alreadyExists = persons.find(person => person.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const renderPersons = () => {
    return persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>

        <div>
          <button type="submit" onClick={handleNewPersonClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderPersons()}
    </div>
  )
}

export default App
