import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'

const BookDetail = () => {
  const [queryParameters] = useSearchParams()
  const match = useMatch('/book-detail/:type/:key')
  const myMatch = match.params.key



  return (
    <div id="book-detail">
      <h2>Book Detail</h2>
      <p>Test: {myMatch}</p>
    </div>
  )
}

export default BookDetail