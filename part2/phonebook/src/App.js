import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PhonebookForm from './components/PhonebookForm'
import Persons from './components/Persons'

const App = (props) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ filterValue, setFilterValue] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
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

  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === Number(id))
    if (window.confirm(`Delete ${personToRemove.name}?`)){   
      personService
      .remove(id)
      setFilterValue('')

      /* const personsLeft = persons.filter(person => person.id !== Number(id))
      setPersons(personsLeft)
      setPersonsToShow(personsLeft)
      setFilterValue('') */
      
      setTimeout(() => {
        personService
          .getAll()
          .then(updatePersons => {
          setPersons(updatePersons)
          setPersonsToShow(updatePersons)
        })
      }, 10)
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    const searchString = event.target.value
    setFilterValue(searchString)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with
        <input
          value={filterValue} 
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
      <Persons removePerson={removePerson} personsToShow={personsToShow} />
    </div>
  )
}

export default App