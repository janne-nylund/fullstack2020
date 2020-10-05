import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PhonebookForm from './components/PhonebookForm'
import Persons from './components/Persons'

const App = (props) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([])

  useEffect(() => {
    //console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      //console.log('promise fulfilled')
      setPersons(initialPersons)
      setPersonsToShow(initialPersons)
  })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    

    // array.some -> if atleast one of the elements match
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
    })
      
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
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
    // console.log(searchString.toLowerCase())
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