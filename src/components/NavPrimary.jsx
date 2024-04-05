import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavPrimaryMobile from './NavPrimaryMobile'

const NavPrimary = () => {
  const user = useSelector(state => state.user)

  return (
    <div id="header-primary">
      <div className="header-image">
        <a href="/"><img src="/images/bookharbr-logo.png" className="logo-header" /></a>
      </div>
      <div className="header-container">
        <a href="/"><h1>BookHarbr</h1></a>
        <div id="nav-desktop" className="nav-container">          
          <Link to="/">Home</Link>
          <Link to="/lists">My Lists</Link>
          <Link to="/book-search">Book Search</Link>
          { user === null 
            ? <Link to="/my-account">Login</Link>
            : <Link to="/my-account">{user.username}&apos;s Account</Link>
          } 
        </div>
      </div> 
      <div id="nav-hamburger">
        <NavPrimaryMobile />
      </div>  
    </div>
  )
}

export default NavPrimary