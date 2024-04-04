import { useNavigate, useMatch, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import olService from '../services/ol'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, createError } from '../reducers/alertReducer'
import ListsFunctions from './ListsFunctions'
import { updateLists } from '../reducers/listsReducer'

const BookDetail = () => {
  const [ workInfo, setWorkInfo ] = useState(null)
  const [ authorInfo, setAuthorInfo ] = useState([])
  const [ selectedBooks, setSelectedBooks ] = useState([])

  const currentUser = useSelector((state) => state.user)
  const userLists = useSelector(state => state.lists)
  
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

  const addToListShow = () => {
    document.getElementById("myForm").style.display = "block"
  }

  const addToListHide = () => {
    document.getElementById("myForm").style.display = "none"
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

  const authorArr = buildAuthorList()

  const handleSelected = () => {
    const newArray = [{
      bookKey: workInfo.key,
      title: workInfo.title,
      authors: authorArr.split(',').map(a => a.trim()),
    }]
    setSelectedBooks(newArray)
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
  
  const handleListCancel = null

  // Prevent re-rendering if the user refreshes the browser
  if (!workInfo) {
    return null
  }


  return (
    <div id="book-detail">
      <div id="list-modification">
        <button className="open-button button-small" 
          onClick={() => handleSelected()}>+list</button>
        <ListsFunctions 
          selectedBooks={selectedBooks} 
          handleListAdd={handleListAdd} 
          handleListCancel={handleListCancel} 
        />
      </div>
      { workInfo.title ? <h2>{workInfo.title}</h2> : null }
      { authorInfo.length > 0
        ? <div className="author">by {authorArr}</div>
        : null
      }
      { workInfo.covers 
        ? <img className="book-cover" src={buildCoverImageUrl()} /> 
        : null 
      }
      { workInfo.description 
        ? <div className="description">{buildDescription()}</div> 
        : null 
      }

      {/* { debugInfo() } */}
    </div>
  )
}

export default BookDetail