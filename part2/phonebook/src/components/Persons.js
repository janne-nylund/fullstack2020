import React from 'react'
import Person from './Person'

const Persons = ({personsToShow}) => {
    return (
      <div>{personsToShow.map((person) =>
        <div key={person.id}>  
        <Person person={person} />
        </div>
    )}
    </div>
    )
}

export default Persons
