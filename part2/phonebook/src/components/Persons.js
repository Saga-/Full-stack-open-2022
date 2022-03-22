export const Persons = ({ persons, filter }) => {
  const renderPersons = () => {
    if (!filter) {
      return persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    }
    const personsFiltered = persons.filter(person => new RegExp(filter, 'i').test(person.name))
    return personsFiltered.map(person => <div key={person.name}>{person.name} {person.number}</div>);
  }

  return renderPersons();
}

export default Persons;
