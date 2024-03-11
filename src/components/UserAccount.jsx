import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import listsService from '../services/lists'
import { userSet } from '../reducers/userReducer'
import { setUserLists } from '../reducers/listsReducer'
import { createNotification, createError } from '../reducers/alertReducer'

const UserAccount = (location) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBookHarbrUser', JSON.stringify(user))
      listsService.setToken(user.token)
      dispatch(userSet(user))
      dispatch(setUserLists(user))
      dispatch(createNotification(`User ${username} logged in.`))
    } catch (exception) {
      dispatch(createError('Wrong username or password. Please try again.'))
      console.log(`wrong username or password: ${exception}`)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInBookHarbrUser')
    dispatch(createNotification(`User logged out.`))
    dispatch(userSet(null))
  }

  if (currentUser) {
    return (
      <div id="user-account">
        <h2>User Account</h2>
        <p>User info here.</p>
        <form onSubmit={handleLogout}>
            <button className="login-logout" type="submit">
              logout
            </button>
          </form>
      </div>
    )
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
        <form className="login" onSubmit={handleLogin}>
          <div>
            Username
            <input type="text" name="username" className="login-username" />
          </div>
          <div>
            Password
            <input type="password" name="password" className="login-password" />
          </div>
          <button className="login-submit" type="submit">
            login
          </button>
        </form>
    </div>
  )
}

export default UserAccount