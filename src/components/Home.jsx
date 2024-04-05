import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const user = useSelector(state => state.user)

  const HomeContent = () => {
    return (
      <div className="home-content">
        <h2>Welcome to BookHarbr</h2>
        <p>BookHarbr is a simple app that allows you to create and populate lists of your favorite books.
          You can make lists to track books you have read, books you want to read, books that fit a certain genre or mood,
          or whatever you want.</p>
        <p>You can also read about how the app was built <Link to="/about">on the About page</Link>.</p>
      </div>
    )
  }

  if (user) {
  return (
    <div id="home">
      <p>Welcome, {user.username}.</p>
      <HomeContent />      
    </div>
  )
  } else {
    return (
      <div id="home">
        <p>Welcome. Please <Link to="/my-account">log in to continue</Link>.</p>
        <HomeContent /> 
      </div>
    )
  }
}

export default Home