import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Footer = () => {
  const user = useSelector(state => state.user)

  return (
    <div id="footer" className="header-container">
      <div className="nav-container">          
        <Link to="/about">About this App</Link>
        <Link to="https://github.com/stars/seanodaniels/lists/bookharbr" target="_blank">BookHarbr Github</Link>
        <Link to="https://github.com/seanodaniels" target="_blank">Sean&apos;s GitHub</Link>
      </div>
      <div className="credit-container">
        Book searching capability provided by <Link to="https://openlibrary.org/" target="_blank">OpenLibrary</Link>.
      </div>
    </div> 
  )
}

export default Footer