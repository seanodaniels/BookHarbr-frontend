import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import { userSet } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    event.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    console.log('username', username)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBookHarbrUser', JSON.stringify(user))
      loginService.setToken(user.token)
      dispatch(userSet(user))
    } catch (exception) {
      console.log(`wrong username or password: ${exception}`)
    }
  }
  return (
    <div id="login-form">
      <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <span>
            username
            <input type="text" name="username" className="login-username" />
          </span>
          <span>
            password
            <input type="password" name="password" className="login-password" />
          </span>
          <button className="login-submit" type="submit">
            login
          </button>
        </form>
    </div>
  )
}

export default LoginForm