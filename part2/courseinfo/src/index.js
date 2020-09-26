import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
  return (
  <div>  
  <Header courseName={course} />
  <Content contentsParts={course} />
  <Total totalExercises={course} />
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
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
        )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))