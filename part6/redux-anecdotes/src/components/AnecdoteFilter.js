import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const FilterAnecdotes = (props) => {

  const handleChange = (event) => {
    props.filterChange(event.target.value)
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

const mapStateToProps = (state) => { return { filter: state.filter } }
const mapDispatchToProps = { filterChange }
export default connect(mapStateToProps, mapDispatchToProps)(FilterAnecdotes)