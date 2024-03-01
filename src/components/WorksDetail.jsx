import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'

const WorksDetail = () => {
  const [queryParameters] = useSearchParams()
  const match = useMatch('/works-detail/works/:key')
  const searchKey = match.params.key

  return (
    <div id="book-detail">
      <h2>Book Detail</h2>
      <p>Test: books/{searchKey}</p>
    </div>
  )
}

export default WorksDetail