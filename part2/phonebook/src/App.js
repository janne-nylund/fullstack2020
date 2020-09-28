import React, { useState } from 'react'

const Person = ({ name }) => {
  return (
    <p>{name.name}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName
    }

    // array.some -> if atleast one of the elements match
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name:
          <input 
          value={newName} 
          onChange={handleNameChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map((person) => 
          <Person key={person.name} name={person} />
      )}
      </div>
    </div>
  )
}

export default App