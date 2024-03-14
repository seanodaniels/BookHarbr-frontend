import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'

const BookDetail = () => {
  const [ workInfo, setWorkInfo ] = useState(null)
  const [ authorInfo, setAuthorInfo ] = useState([])
  const hasPageBeenRendered = useRef(false)

  const dispatch = useDispatch()

  const match = useMatch('/works/:key')

  useEffect(() => {

    const fetchWorks = async () => {
      try {
        const results = olService.olWorksSearch(match.params.key)
        return results
      } catch (error) {
        null
      }
    }

    const fetchAuthors = async (authorKey) => {
      try {
        const results = olService.olAuthorSearch(workInfo.authors[0].author.key)
        return results
      } catch (error) {
        null
      }
    }

    const fetchAll = async () => {
      const getWorks = await fetchWorks()
      console.log('1st author', getWorks.authors[0].author.key)
      const getAuthors = await fetchAuthors(getWorks.authors[0].author.key)
      console.log('getAuthors', getAuthors)
      setWorkInfo(getWorks)
      setAuthorInfo(getAuthors)
    }

    fetchAll()

  }, [])

  // Prevent re-rendering if the user refreshes the browser
  if (!workInfo) {
    return null
  }

  const imageUrl = `https://covers.openlibrary.org/b/id/${workInfo.covers[0]}.jpg`
  // https://covers.openlibrary.org/b/id/works/OL20128158W.jpg

  return (
    <div id="book-detail">

      <hr /><h2>WORK</h2><pre>
      {
        JSON.stringify(workInfo, null, 2)
      }
      </pre>
      <hr /><h2>AUTHOR</h2><pre>
      {
        JSON.stringify(authorInfo, null, 2)
      }
      </pre>
    </div>
  )
}

export default BookDetail