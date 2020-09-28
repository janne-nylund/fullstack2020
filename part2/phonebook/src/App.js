import React, { useState } from 'react'
import PhonebookForm from './components/PhonebookForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  // const [ findPersons, setFindPersons ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    // array.some -> if atleast one of the elements match
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setPersonsToShow(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    // setFindPersons(event.target.value)
    const searchString = event.target.value
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase())))
    console.log(searchString.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with
        <input 
          onChange={handleFindChange}
        />
      </div>
      <h2>Add a new person</h2>
      <PhonebookForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App