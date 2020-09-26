import React from 'react'

const Course = ({courses}) => {
    return (
        <div>
        {courses.map((course) =>
            <div key={course.id}> 
                <Header courseName={course} />
                <Content contentsParts={course} />
                <Total totalExercises={course} />
            </div> 
            )}
        </div>
    )
  }
  
  const Header = ({courseName}) => {
    return (
      <h1>{courseName.name}</h1>
    )
  }
  
  const Content = ({contentsParts}) => {
    return (
      <div>
        {contentsParts.parts.map((part) => 
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Total = ({ totalExercises }) => {
    const sum = totalExercises.parts.reduce(((s, p) => {
      return s + p.exercises 
    }), 0)
  
    return(
      <p><b>total of {sum} exercises</b></p>
    ) 
  }
  
export default Course