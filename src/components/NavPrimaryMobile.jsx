import { useEffect, useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavPrimaryMobile = () => {
  const user = useSelector(state => state.user)

  const [menuVisible, setMenuVisible] = useState(false)

  const closeMenu = () => {
    setMenuVisible(false)
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  useEffect (() => {
    setMenuVisible(false)
  }, [])

  return (
    <Menu 
      right 
      isOpen={menuVisible}
      onOpen={toggleMenu}  
      onClose={toggleMenu} 
      width={ '100%' }
    >
        <Link onClick={() => closeMenu()} className="menu-item" to="/">Home</Link>
        <Link onClick={() => closeMenu()} className="menu-item" to="/lists">My Lists</Link>
        <Link onClick={() => closeMenu()} className="menu-item" to="/book-search">Book Search</Link>
        { user === null 
          ? <Link onClick={() => closeMenu()} className="menu-item" to="/my-account">Login</Link>
          : <Link onClick={() => closeMenu()} className="menu-item" to="/my-account">{user.username}&apos;s Account</Link>
        }
    </Menu>
  )
}

export default NavPrimaryMobile