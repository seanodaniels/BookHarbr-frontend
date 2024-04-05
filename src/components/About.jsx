import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const About = () => {
  const user = useSelector(state => state.user)
  return (
    <div id="home">
      <h2>About</h2>
      <p>hi.</p>
    </div>
  )
}

export default About