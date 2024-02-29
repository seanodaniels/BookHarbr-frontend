import { useState, useEffect } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

const BookSearch = () => {
  const [searchTerms, setSearchTerms ] = useState('')
  const [searchType, setSearchType] = useState('general')
  const [searchResults, setSearchResults] = useState(null)  
  const [queryParameters] = useSearchParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = []
  queryParameters.forEach((value, key) => {
    const formattedVal = value.split(' ').join('+')
    params.push(`${key}=${formattedVal}`)
  })
  const queryParametersForUrl = params.join('&')

  useEffect(() => {
    olService
    .olGeneralSearch(queryParametersForUrl)
    .then(o => {
      console.log('results', o)
      if (o.numFound === 0) {
        dispatch(createNotification('No results found.'))
      } else {
        setSearchResults(o.docs)
      }
    })    
  }, [])

  useEffect(() => {
    olService
    .olGeneralSearch(queryParametersForUrl)
    .then(o => {
      console.log('results', o)
      if (o.numFound === 0) {
        dispatch(createNotification('No results found.'))
      } else {
        setSearchResults(o.docs)
      }
    })    
  }, [queryParameters])

  const handleSubmit = (event) => {
    event.preventDefault()

    let urlQueryType = 'q='

    switch (searchType) {
      case "general":
        urlQueryType = "q="
        break
      case "title":
        urlQueryType = "title="
        break
      case "author":
        urlQueryType = "author="
        break
      default:
        urlQueryType = "q="
        break
    }

    const queryValues = searchTerms
    const urlQueryValues = queryValues.split(' ').join('+')
    const newSearchParams = urlQueryType + urlQueryValues
    navigate(`/book-search/?${newSearchParams}`)
  }


  const handleOptionChange = (selectedOption) => {
    switch (selectedOption) {
      case "general":
        setSearchType('general')
        break
      case "title":
        setSearchType('title')
        break
      case "author":
        setSearchType('author')
        break
      default:
        setSearchType('general')
        break
    }
  }

  return (
    <div id="book-search">
      <p>Search for your book.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="searchTerms" 
          onChange={(event) => setSearchTerms(event.target.value)}  
        />
        <label>          
          <input 
            type="radio" 
            name="search-type" 
            value="general"
            checked={searchType === 'general'} 
            onChange={(event) => handleOptionChange('general')} 
            className="search-check-input"
          />
          General
        </label>
        <label>          
          <input 
            type="radio" 
            name="search-type" 
            value="title"
            className="search-check-input"
            checked={searchType === 'title'}
            onChange={(event) => handleOptionChange('title')} 
          />
          by Title
        </label>
        <label>          
          <input 
            type="radio" 
            name="search-type" 
            value="author"
            className="search-check-input"
            checked={searchType === 'author'}
            onChange={(event) => handleOptionChange('author')} 
          />
          by Author
        </label>
        <button type="submit">Search</button>
      </form>

      { searchResults ? searchResults.map(r => {
        return (
          <p>{r.title} by {r.author_name}</p>
        )
      }) : null }
    </div>
  )
}

export default BookSearch