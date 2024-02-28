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
import { userSet } from './reducers/userReducer'
import { setUserLists } from './reducers/listsReducer'
import listsService from './services/lists'
import Home from './components/Home'
import Lists from './components/Lists'
import UserAccount from  './components/UserAccount'
import NavPrimary from './components/NavPrimary'
import LoginForm from './components/LoginForm'
import Alert from './components/Alert'
import { initializeBooks } from './reducers/booksReducer'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const loggedInBookHarbrUser = window.localStorage.getItem('loggedInBookHarbrUser')
    if (loggedInBookHarbrUser) {
      const user = JSON.parse(loggedInBookHarbrUser)
      dispatch(userSet(user))
      listsService.setToken(user.token)
      dispatch(setUserLists(user))
    } 
  }, [])

  return (
    <div id="page">
      <div id="nav-primary">
        <NavPrimary />
      </div>
      <h1>BookHarbr</h1>
      <Alert />
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
