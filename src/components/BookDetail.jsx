import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'

const BookDetail = () => {
  const [ searchType, setSearchType ] = useState(null)
  const [ searchKey, setSearchKey ] = useState(null)
  const [ workInfo, setWorkInfo ] = useState(null)
  const [ title, setTitle ] = useState(null)
  const [ author, setAuthor ] = useState(null)
  const [ key, setKey ] = useState(null)
  const [ numPages, setNumPages ] = useState(null)
  const [ publishDate, setPublishDate ] = useState(null)
  const [ publishers, setPublishers ] = useState([])
  const [queryParameters] = useSearchParams()

  const dispatch = useDispatch()

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
    try {
      olService
      .olWorksSearch(match.params.type, match.params.key)
      .then(w => {
        if (w) {
          console.log('results', w)
          setWorkInfo(w)

          // Sanitize Data / Assign to local page info
          if (w.title) {
            setTitle(w.title)
          }       
          if (w.key) {
            setKey(w.key)
          }       
          if (w.number_of_pages) {
            setNumPages(w.number_of_pages)
          }       
          if (w.publish_date) {
            setPublishDate(w.publish_date)
          }       
          if (w.publishers) {
            setPublishers(w.publishers)
          }  
          if (w.authors.length > 0) {
            console.log('ak', w.authors[0].key)
            olService.olAuthorSearch(w.authors[0].key)
            .then(a => {
              setAuthor(a.name)
            })
          }
          if (w.authors.length > 1) {
            const firstAuthor = author
            setAuthor(`${firstAuthor}, et al.`)
          }
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



    // if (workInfo.authors.length > 0) {
    //   try {
    //     olService
    //     .olAuthorSearch(workInfo.authors.key)
    //     .then(a => a.name)
    //   } catch (error) {
    //     dispatch(createNotification(`Error: ${error}`))
    //   }
    // }
    
    // if (workInfo.key) {
    //   finalObject.key = workInfo.key
    // }
    // if (workInfo.number_of_pages) {
    //   finalObject.number_of_pages = workInfo.number_of_pages
    // }
    // if (workInfo.publish_date) {
    //   finalObject.publish_date = workInfo.publish_date
    // }
    // if (workInfo.publishers.length > 0) {
    //   finalObject.publishers = workInfo.publishers
    // }

  return (
    <div id="book-detail">
      <h2>Book Detail</h2>
      <p>{title}</p>
      <p>{author}</p>
      <p>{key}</p>
      <p>{numPages}</p>
      <p>{publishDate}</p>
      <p>{publishers}</p>
    </div>
  )
}

export default BookDetail