import {useEffect, useState} from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personApiService from './services/personApiService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personApiService.getAllPersons()
      .then(persons => setPersons(persons))
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        persons={persons}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
