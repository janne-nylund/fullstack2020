import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PhonebookForm from './components/PhonebookForm'
import Persons from './components/Persons'

const App = (props) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    // array.some -> if atleast one of the elements match
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setPersonsToShow(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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