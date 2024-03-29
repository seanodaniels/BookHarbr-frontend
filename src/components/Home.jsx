import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const user = useSelector(state => state.user)
  if (user) {
  return (
    <div id="home">
      <h2>Home</h2>
      <p>Welcome, {user.username}. Check out <Link to="/lists">your lists</Link>.</p>
    </div>
  )
  } else {
    return (
      <div id="home">
        <h2>Home</h2>
        <p>Welcome. Please <Link to="/my-account">log in to continue</Link>.</p>
      </div>
    )
  }
}

export default Home