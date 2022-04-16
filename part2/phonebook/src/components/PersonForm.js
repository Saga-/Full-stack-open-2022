import personApiService from '../services/personApiService';

export const PersonForm = ({ setNewName, setNewNumber, setPersons, newName, newNumber, persons }) => {
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const alreadyExists = persons.find(person => person.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personApiService.addNewPerson(newPerson)
        .then(() => {
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(() => alert('Error: Person not saved'))
    }
  }


  return(
    <form>
      <div>name: <input value={ newName} onChange={handleNameChange} /></div>
      <div>number: <input value={ newNumber } onChange={handleNumberChange} /></div>

      <div>
        <button type="submit" onClick={handleFormSubmit}>add</button>
      </div>
    </form>
  )
}

export default PersonForm;
