import { useState, useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Books from './components/Books'
import Lists from './components/Lists'
import { initializeBooks } from './reducers/booksReducer'
import { initializeLists } from './reducers/listsReducer'

const App = () => {
  const dispatch = useDispatch() 

  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(initializeBooks())
    dispatch(initializeLists())
  }, [])

  return (
    <div id="page">
      <h1>BookHarbr</h1>
      <Books />
      <Lists />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
