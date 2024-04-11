import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const About = () => {
  const user = useSelector(state => state.user)
  return (
    <div id="home">
      <h2>About BookHarbr</h2>

      <p>BookHarbr is simple app to create lists of books. For a live demo, please <Link to="/my-account">visit the login page</Link> and sign in as demo/demo.</p>
      <h3>Tech Breakdown</h3>
      <p>BookHarbr is a litle project I created to showcase the Javascript and React that I have learned. The 
        core of the app is built in NodeJS and React, and a breakdown of the other technologies is as follows:</p>
      <ul>
        <li><strong>Redux, React-Redux, Redux Toolkit</strong></li>
        <li><strong>MongoDB and Mongoose</strong></li>
        <li><strong>Express</strong></li>
        <li><strong>Axios</strong></li>
        <li><strong>React Router</strong></li>
        <li><strong>bcrypt, jsonwebtoken</strong></li>
        <li><strong>Jest</strong></li>
        <li><strong>Flexbox</strong></li>
      </ul>

      <p>The book search is powered by the OpenLibrary.org API. Information from that API is used to build the 
        BookHarbr book lists. The lists and user information are stored at Mongo Atlas.</p>

      <p>You can view the GitHub repos for BookHarbr here:</p>
      <ul>
      <li><a href="https://github.com/seanodaniels/BookHarbr-backend" target="_blank">BookHarbr Backend API</a></li>
      <li><a href="https://github.com/seanodaniels/BookHarbr-frontend" target="_blank">BookHarbr Front End</a></li>
      </ul>

    </div>
  )
}

export default About