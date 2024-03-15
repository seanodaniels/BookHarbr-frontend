import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'

const BookDetail = () => {
  const [ workInfo, setWorkInfo ] = useState(null)
  const [ authorInfo, setAuthorInfo ] = useState([])
  
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
      // Get Work info
      const getWorks = await fetchWork()

      // Get Author(s) but fetch a maximum equal to MAX_NUMBER_OF_AUTHORS_DISPLAYED
      let authorArray = []
      const numAuthors = getWorks.authors.length <= MAX_NUMBER_OF_AUTHORS_DISPLAYED 
        ? getWorks.authors.length 
        : MAX_NUMBER_OF_AUTHORS_DISPLAYED
      for (let i = 0; i < numAuthors; i++) {
        authorArray[i] = await fetchAuthor(getWorks.authors[i].author.key)
      }

      // Set page state
      setWorkInfo(getWorks)
      setAuthorInfo(authorArray)
    }

    // Get all page information
    fetchAll()

  }, [])

  const buildCoverImageUrl = () => {
    return workInfo.covers 
    ? `https://covers.openlibrary.org/b/id/${workInfo.covers[0]}.jpg`
    : '/images/Image_not_available.png'
  }

  const buildAuthorList = () => {
    const authorList = authorInfo.map(a => a.name)
    return authorList.toString().replace(/,/g, ', ')
  }

  const buildDescription = () => {
    let rawDescription = ''
    workInfo.description
    ? workInfo.description.value
      ? rawDescription = workInfo.description.value
      : rawDescription = workInfo.description
    : null
    return rawDescription
  }

  const debugInfo = () => {
    return (
      <div>
        <hr />
        <h2>WORK</h2><pre>
        {
          JSON.stringify(workInfo, null, 2)
        }
        </pre>
        <hr />
        <h2>AUTHOR</h2><pre>
        {
          authorInfo.map(a => <p key={a.key}>{a.name}</p>)
        }
        </pre>
      </div>
    )
  }

  // Prevent re-rendering if the user refreshes the browser
  if (!workInfo) {
    return null
  }

  return (
    <div id="book-detail">
      { workInfo.title ? <h2>{workInfo.title}</h2> : null }
      { authorInfo.length > 0
        ? <div className="author">by {buildAuthorList()}</div>
        : null
      }
      { workInfo.covers ? <img className="book-cover" src={buildCoverImageUrl()} /> : null }
      { workInfo.description ? <div className="description">{buildDescription()}</div> : null }

      {/* { debugInfo() } */}
    </div>
  )
}

export default BookDetail