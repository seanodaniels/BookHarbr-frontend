import { Link } from 'react-router-dom'

const NeedLogin = () => {
  return (
    <div id="need-login">
      <h2>Login Required</h2>
      <p>Welcome. Please <Link to="/my-account">log in to continue</Link>.</p>
    </div>
  )
}

export default NeedLogin