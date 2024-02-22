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
import Home from './components/Home'
import Lists from './components/Lists'
import UserAccount from  './components/UserAccount'
import NavPrimary from './components/NavPrimary'
import LoginForm from './components/LoginForm'
import { initializeBooks } from './reducers/booksReducer'
import { initializeLists } from './reducers/listsReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  let currentUser = useSelector(state => state.user)
  if (!currentUser) {
    currentUser = 'not logged in'
  }

  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(initializeBooks())
    dispatch(initializeLists())
    dispatch(initializeUsers())
  }, [])

  return (
    <div id="page">
      <div id="nav-primary">
        <NavPrimary />
      </div>
      <h1>BookHarbr</h1>
      <p>User: {currentUser.username}</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/my-account" element={<UserAccount />} />
        <Route path="/login-form" element={<LoginForm />} />
      </Routes>
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
