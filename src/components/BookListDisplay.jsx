import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createList, updateLists, deleteList } from '../reducers/listsReducer'
import { createNotification, createError } from '../reducers/alertReducer'
import { Link } from 'react-router-dom'

const BookListDisplay = ({ list }) => {
  const [listName, setListName] = useState(list.listName)
  const [changeListNameVisible, setChangeListNameVisible] = useState(false)
  const [showRename, setShowRename] = useState(false)
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()

  const handleBookDelete = (book, event) => {
    const bookToBeDeleted = book
    const bookToBeDeletedKey = bookToBeDeleted.bookKey
    const changedListBooks = list.books.filter(b => b.bookKey !== bookToBeDeletedKey)
    const changedList = { ...list, books: changedListBooks }

    let confirmDelete = `Remove book "${book.title}" from ${list.listName}?`

    if (window.confirm(confirmDelete)) {
      try {
        dispatch(updateLists(changedList, currentUser))
        dispatch(createNotification(`${bookToBeDeleted.title} deleted`))
      } catch (e) {
        dispatch(createError(`Error: ${e}`))
      }
    }
  }

  const handleListNameChange = (list, e) => {
    e.preventDefault()
    const newListName = e.target.listNameInput.value
    const changedList = { ...list, listName: newListName }

    let confirmChange = `Confirm: change the name of list "${list.listName}" to "${newListName}"?`

    if (window.confirm(confirmChange)) {
      try {
        dispatch(updateLists(changedList, currentUser))
        dispatch(createNotification(`List "${list.listName}" renamed to "${newListName}"`))
      } catch (e) {
        dispatch(createError(`Error: ${e}`))
      }
      setShowRename(false)
    }
  }

  const handleDeleteList = (list) => {
    const listToBeDeleted = { ...list }

    let confirmDelete = `Confirm: delete "${listToBeDeleted.listName}"?`

    if (window.confirm(confirmDelete)) {
      try {
        dispatch(deleteList(listToBeDeleted.id))
        dispatch(createNotification(`List "${listToBeDeleted.listName}" deleted.`))
      } catch (e) {
        dispatch(createError(`Error: ${e}`))
      }
    }
  }

  const editHidden = { display: showRename ? 'none' : '' }
  const editShown = { display: showRename ? '' : 'none' }
  const editHighlighted = showRename ? 'edit-highlighted' : ''

  return (
    <div className="list-item">
      <div className={editHighlighted}>
        <span className="list-display" style={editHidden}>{list.listName}</span>
        <span style={editHidden} className="function-text" onClick={() => setShowRename(true)}>edit</span>        
      
        <div className="list-name-change" style={editShown}>
          <form onSubmit={(e) => handleListNameChange(list, e)}>
            <input name="listNameInput" defaultValue={list.listName} />
            <button className="button-small" type="submit">change name</button>
          </form>
          <button className="button-small" onClick={() => handleDeleteList(list)}>delete list</button>
          <button className="button-small" onClick={() => setShowRename(false)}>cancel</button>
        </div>
      </div>
      { list.books && list.books.length > 0
        ? <table className="book-list data-display-01">
            <tbody>
              {list.books.map(b => {
                const authors = b.authors.join(', ')
                return(
                  <tr key={b.bookKey}>
                    <td className="book-info"><Link to={`${b.bookKey}`}>{b.title}</Link> by {authors}</td>
                    <td className="book-controls"><button className="button-small" onClick={(e) => handleBookDelete(b,e)}>x</button></td>
                  </tr>
                )}
              )}
            </tbody>
          </table>
        : null
      }
    </div>
  )  

} 

export default BookListDisplay