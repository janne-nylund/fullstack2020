import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import anecdoteService from './services/anecdotes'
import { initialAnec } from './reducers/anecdoteReducer'

anecdoteService.getAll().then(a =>
  store.dispatch(initialAnec(a))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)