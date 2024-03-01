import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const BookDetail = () => {
  const [ searchType, setSearchType ] = useState(null)
  const [ searchKey, setSearchKey ] = useState(null)
  const [queryParameters] = useSearchParams()

  const match = useMatch('/book-detail/:type/:key')

  useEffect(() => {
    // [TO-DO]: validate format of key
    setSearchKey(match.params.key)
    // Restrict :type to 'books' or 'works'
    switch (match.params.type) {
      case "books":
        setSearchType('books')
        break
      case "works":
        setSearchType('works')
        break
      default:
        setSearchType('books')
        break
    }
  }, [])

  return (
    <div id="book-detail">
      <h2>Book Detail</h2>
      <p>Test: books/{searchKey}</p>
    </div>
  )
}

export default BookDetail