const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let copyOfState = { ...state }
  switch (action.type) {
    case 'GOOD':
      copyOfState.good = copyOfState.good + 1
      return copyOfState
    case 'OK':
      copyOfState.ok = copyOfState.ok + 1
      return copyOfState
    case 'BAD':
      copyOfState.bad = copyOfState.bad + 1
      return copyOfState
    case 'ZERO':
      return initialState
    default: 
      return initialState
  }
}

export default counterReducer