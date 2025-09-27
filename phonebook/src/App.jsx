import { useState } from 'react'
import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Persons from './components/persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
  setNewNumber(event.target.value);
}
  const handleFilter = (event) => {
  setFilter(event.target.value);
  }
  const addPerson = (event) => {
  event.preventDefault()
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) { alert(`${newName} is already added to phonebook`);
     } else {
  const personObject =
    {name: newName,
     number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
     }
}
    const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
    );
  return (
  <div>
    <h2>Phonebook</h2>

    <Filter value={filter} onChange={handleFilter} />

    <h3>Add a new</h3>

    <PersonForm 
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
    />

    <h3>Numbers</h3>

    <Persons persons={personsToShow} />
  </div>
)
}

export default App