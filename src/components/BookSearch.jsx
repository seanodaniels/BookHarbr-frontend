import { useState } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'

const BookSearch = () => {
  const [searchTerms, setSearchTerms ] = useState('')
  const [searchType, setSearchType] = useState('general')
  const [searchResults, setSearchResults] = useState(null)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const searchObject = {
      searchTerms,
      searchType
    }
      olService
        .generalSearch(searchObject)
        .then(o => {
          console.log('results', o)
          if (o.numFound === 0) {
            dispatch(createNotification('No results found.'))
          } else {
            setSearchResults(o.docs)
          }
      })
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