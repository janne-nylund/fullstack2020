import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const FilterAnecdotes = (props) => {

  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }

  const styleInput = {
    marginBottom: 10
  }

  return (
    <div style={styleInput}>
      <b>Filter anecdotes</b> <input onChange={handleChange} value={props.filter} />
    </div>
  )
}

const mapDispatchToProps = { changeFilter }
export default connect(null, mapDispatchToProps)(FilterAnecdotes)