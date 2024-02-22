import { Link } from 'react-router-dom'

const NavPrimary = () => {
  return (
    <div id="nav-primary">
      <Link to="/">Home</Link>
      <Link to="/lists">My Lists</Link>
      <Link to="/my-account">My Account</Link>
      <Link to="/login-form">Login</Link>
    </div>
  )
}

export default NavPrimary