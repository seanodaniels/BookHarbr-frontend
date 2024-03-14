import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'

const BookDetail = () => {
  const [ searchType, setSearchType ] = useState(null)
  const [ searchKey, setSearchKey ] = useState(null)
  const [ workInfo, setWorkInfo ] = useState(null)

  const dispatch = useDispatch()

  const match = useMatch('/works/:key')
  
  useEffect(() => {
    try {
      olService
      .olWorksSearch(match.params.key)
      .then(w => {
        if (w) {
          setWorkInfo(w)
        } else {
          dispatch(createNotification('No results found.', 10000))
        }
      })
    } catch (error) {
        dispatch(createNotification(`Error: ${error}`))
    }
  }, [])

  // Prevent re-rendering if the user refreshes the browser
  if (!workInfo) {
    return null
  }

  return (
    <div id="book-detail">
      <h2>Book Detail</h2>
      <pre>
      {
        JSON.stringify(workInfo, null, 2)   
      
      }
      </pre>
    </div>
  )
}

export default BookDetail