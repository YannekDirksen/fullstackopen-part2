import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Persons from './components/persons';
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
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
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
    const userConfirmed = window.confirm(`${existingPerson.name} is already added to phonebook, replacce the old number with a new one?`);
    if (userConfirmed) {
    const changedPerson = {name: existingPerson.name, number: newNumber };
    personService
      .update(existingPerson.id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person));
        setNewName('');
        setNewNumber('');
      });
  }
     } else {
  const personObject =
    {name: newName,
     number: newNumber
    }
    setNewName('')
    setNewNumber('')
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })
  }
        
      }
   const deletePersonOf = (id) => {
  const person = persons.find(p => p.id === id);
  const userConfirmed = window.confirm(`Delete ${person.name}?`);

  if (userConfirmed) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
  }
};
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

    <Persons persons={personsToShow} handleDelete={deletePersonOf} />
  </div>
)
}

export default App