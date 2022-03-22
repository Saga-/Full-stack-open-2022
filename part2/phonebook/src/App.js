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
  const [filter, setFilter] = useState('');

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
    if (!filter) {
      return persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    }
    const personsFiltered = persons.filter(person => new RegExp(filter, 'i').test(person.name))
    return personsFiltered.map(person => <div key={person.name}>{person.name} {person.number}</div>);
  }

  const filterPerson = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <div>filter shown with <input onChange={filterPerson} /></div>
      </div>
      <h2>add a new</h2>
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
