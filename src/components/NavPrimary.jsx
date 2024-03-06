import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavPrimary = () => {
  const user = useSelector(state => state.user)

  return (
    <div id="nav-primary">
      <Link to="/">Home</Link>
      <Link to="/lists">My Lists</Link>
      <Link to="/book-search">Book Search</Link>
      { user === null 
        ? <Link to="/my-account">Login</Link>
        : <Link to="/my-account">{user.username}'s Account</Link>
      }      
    </div>
  )
}

export default NavPrimary