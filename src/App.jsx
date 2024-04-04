import { useEffect } from 'react'
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
import BookSearch from './components/BookSearch'
import BookDetail from './components/BookDetail'
import UserAccount from  './components/UserAccount'
import NavPrimary from './components/NavPrimary'
import Alert from './components/Alert'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Check validity of current user
    // [TO-DO]: Rewrite user check. See Notion notes.
    const loggedInBookHarbrUser = window.localStorage.getItem('loggedInBookHarbrUser')
    if (loggedInBookHarbrUser) {
      const user = JSON.parse(loggedInBookHarbrUser)
      dispatch(userSet(user))
      listsService.setToken(user.token)
      dispatch(setUserLists(user))
    } else {
      dispatch(userSet(null))
    }
  }, [])

  return (
    <div id="page">
      <div id="nav-primary">
        <NavPrimary />
      </div>
      <Alert />
      <div id="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/book-search" element={<BookSearch />} />
          <Route path="/works/:key" element={<BookDetail />} />
          <Route path="/my-account" element={<UserAccount />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
