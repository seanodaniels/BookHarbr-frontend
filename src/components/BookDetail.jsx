import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'

const BookDetail = () => {
  const [ workInfo, setWorkInfo ] = useState(null)
  const [ authorInfo, setAuthorInfo ] = useState([])
  const hasPageBeenRendered = useRef(false)
  const MAX_NUMBER_OF_AUTHORS_DISPLAYED = 4

  const dispatch = useDispatch()

  const match = useMatch('/works/:key')

  useEffect(() => {

    const fetchWork = async () => {
      try {
        const results = await olService.olWorksSearch(match.params.key)
        return results
      } catch (error) {
        null
      }
    }

    const fetchAuthor = async (authorKey) => {
      try {
        const results = await olService.olAuthorSearch(authorKey)
        return results
      } catch (error) {
        null
      }
    }

    const fetchAll = async () => {
      const getWorks = await fetchWork()
      console.log('1st author', getWorks.authors[0].author.key)

      let authorArray = []
      const numAuthors = getWorks.authors.length <= MAX_NUMBER_OF_AUTHORS_DISPLAYED 
        ? getWorks.authors.length 
        : MAX_NUMBER_OF_AUTHORS_DISPLAYED
      for (let i = 0; i < numAuthors; i++) {
        authorArray[i] = await fetchAuthor(getWorks.authors[i].author.key)
      }
      setWorkInfo(getWorks)
      setAuthorInfo(authorArray)
    }

    fetchAll()

  }, [])

  // Prevent re-rendering if the user refreshes the browser
  if (!workInfo) {
    return null
  }

  if (workInfo.covers) {
    const imageUrl = `https://covers.openlibrary.org/b/id/${workInfo.covers[0]}.jpg`
  }

  return (
    <div id="book-detail">

      <hr /><h2>WORK</h2><pre>
      {
        JSON.stringify(workInfo, null, 2)
      }
      </pre>
      <hr /><h2>AUTHOR</h2><pre>
      {
        authorInfo.map(a => <p key={a.key}>{a.name}</p>)
      }
      </pre>
    </div>
  )
}

export default BookDetail