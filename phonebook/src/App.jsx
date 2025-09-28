import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Persons from './components/persons';
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
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