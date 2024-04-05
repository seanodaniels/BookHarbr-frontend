import { useState, useEffect } from 'react'
import olService from '../services/ol'
import SearchResults from './SearchResults'
import siteConfig from '../siteConfig'
import ListsFunctions from './ListsFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'
import { updateLists } from '../reducers/listsReducer'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

const BookSearch = () => {
  const [searchTerms, setSearchTerms ] = useState('')
  const [finalSearchTerms, setFinalSearchTerms ] = useState('')
  const [searchType, setSearchType] = useState('general')
  const [searchResults, setSearchResults] = useState(null) 
  const [numberOfRecords, setNumberOfRecords] = useState(null) 
  const [selectedBooks, setSelectedBooks] = useState([])
  const [showListsModal, setShowListsModal] = useState(false)

  const [queryParameters] = useSearchParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = []
  const paramsWitoutPage = []
  const currentPage = Number(queryParameters.get('page'))
  
  const currentUser = useSelector((state) => state.user)
  const userLists = useSelector(state => state.lists)

  // Build two strings from useSearchParams()
  // * queryParametersForUrl:   full URL parameter string
  // * queryParamsWithoutPage:  URL parameter string without the page
  queryParameters.forEach((value, key) => {
    // [TO-DO]: check for valid parameters (&bork=broken is not a valid parameter) 
    const formattedVal = value.split(' ').join('+')
    params.push(`${key}=${formattedVal}`)
    if (key !== 'page') {
      paramsWitoutPage.push(`${key}=${formattedVal}`)
    }
  })
  const queryParametersForUrl = params.join('&')
  const queryParamsWithoutPage = paramsWitoutPage.join('&')

  useEffect(() => {
    if (params.length > 0) { // do not run unless there are search parameters

      // Build OL Query from React state
      // and verify the parameters
      let searchTermsFromUrl = ''
      if (queryParameters.get('q')) {
        searchTermsFromUrl += queryParameters.get('q') + ' '
      }
      if (queryParameters.get('title')) {
        searchTermsFromUrl += queryParameters.get('title') + ' '
      }
      if (queryParameters.get('author')) {
        searchTermsFromUrl += queryParameters.get('author') + ' '
      }
      setFinalSearchTerms(searchTermsFromUrl.trim())

      // Send query to OL
      olService
      .olGeneralSearch(queryParametersForUrl)
      .then(o => {
        if (o.numFound === 0) {
          dispatch(createNotification('No results found.'))
        } else {
          setSearchResults(o)
          setNumberOfRecords(o.numFound)
        }
      })
    }  
  }, [queryParameters])

  const handleSubmit = (event) => {
    // Redirect URL according to submitted search
    // from React state
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
    const pageInitialization = 'page=1'
    navigate(`/book-search/?${newSearchParams}&${pageInitialization}`)    
  }

  const handleSelected = (bookKey, bookTitle, bookAuthors) => {
    const findKey = selectedBooks.filter(b => b.bookKey === bookKey)
    const newObject = {
      bookKey: bookKey,
      title: bookTitle,
      authors: bookAuthors.split(',').map(a => a.trim()),
    }
    const newArray = [...selectedBooks, newObject ]    
    if (findKey && findKey.length > 0) {
      const withoutKey = selectedBooks.filter(b => b.bookKey !== bookKey)
      setSelectedBooks(withoutKey)
    } else {
      setSelectedBooks(newArray)
    }
    addToListShow()
  }

  const handleListAdd = (event) => {
    event.preventDefault()
    if (selectedBooks && selectedBooks.length > 0) {
      // Add selected book to the list. Note: the functionality is in place to handle
      // multiple selections but is not implemented yet. For now, we just grab the only
      // (and first) item in the array.
      const selectedListId = event.target.selectedList.value
      const chosenList = userLists.find(l => l.id === selectedListId)
      const chosenListContents = chosenList.books
      const chosenListKeys = chosenListContents.map(item => item.bookKey)

      // build an array called dupesArr containing any item in selectedBooks that is also
      // in chosenList
      const dupesArr = selectedBooks.filter(value => chosenListKeys.includes(value.bookKey))

      if (dupesArr && dupesArr.length > 0) {
        // if dupesArr.length > 0, then 
        // * create error message listing books that are dupes
        const listOfDupes = dupesArr.map(d => d.title).join(', ')
        dispatch(createError(`${listOfDupes} already in ${chosenList.listName}`))
        // * call addToListHide()
        addToListHide()
        // * setSelectedBooks([])
        setSelectedBooks([])
      // else:
      } else {
        const newListBooks = chosenListContents.concat(selectedBooks)
        const updatedUserLists = {
          ...chosenList,
          books: newListBooks
        }
        dispatch(updateLists(updatedUserLists, currentUser))
        setSelectedBooks([])
        dispatch(createNotification(`${selectedBooks[0].title} added to list "${chosenList.listName}"`)) 
      }
    } else {
      console.log('error: empty selected list')
    }
    addToListHide()
  }

  const handleListCancel = (event) => {
    event.preventDefault()
    addToListHide()
    setSelectedBooks([])
  }

  const addToListShow = () => {
    document.getElementById("myForm").style.display = "block"
  }

  const addToListHide = () => {
    document.getElementById("myForm").style.display = "none"
  }

  // Set React state on radio button change
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

  const handlePageUp = (event) => {
    // Calculate total page numbers
    let totalPages = Math.floor(numberOfRecords/10)
    numberOfRecords % siteConfig.searchLimit !== 0 ? totalPages += 1 : null

    // go to next page only if we are not on the last page already
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1
    navigate(`/book-search/?${queryParamsWithoutPage}&page=${nextPage}`)
  }

  const handlePageDown = (event) => {
    // go to previous page only if we are not already on first page
    const previousPage = currentPage === 1 ? currentPage : Number(currentPage) - 1
    navigate(`/book-search/?${queryParamsWithoutPage}&page=${previousPage}`)
  }

  return (
    <div id="book-search">
      <div id="list-modification">
          <ListsFunctions selectedBooks={selectedBooks} handleListAdd={handleListAdd} handleListCancel={handleListCancel} />
      </div>

      <div id="search-main">
        <h2>Book Search</h2>
        <p>Enter your search term below.</p>
        <form className="book-search" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="searchTerms" 
            className="input-book-search" 
            onChange={(event) => setSearchTerms(event.target.value)}  
          />
          <button type="submit">Search</button>
          <div className="search-types">
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
          </div>
          
        </form>

        { searchResults 
          ? <SearchResults 
            results={searchResults} 
            numRecords={numberOfRecords} 
            currentPage={currentPage}
            terms={finalSearchTerms}
            handlePageUp={handlePageUp}
            handlePageDown={handlePageDown}
            handleSelected={handleSelected}
            /> 
          : null }

        </div>
    </div>
  )
}

export default BookSearch