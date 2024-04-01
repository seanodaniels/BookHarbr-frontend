import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NeedLogin from './NeedLogin'
import { createList, updateLists, deleteList } from '../reducers/listsReducer'
import { createNotification, createError } from '../reducers/alertReducer'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()

  const DisplayList = ({ list }) => {
    const [listName, setListName] = useState(list.listName)
    const [changeListNameVisible, setChangeListNameVisible] = useState(false)
    const [showRename, setShowRename] = useState(false)

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
        e.target.listNameInput.value = ''
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

    console.log('editHighlighted', editHighlighted)

    return (
      <div className="listItem">
        <div className={editHighlighted}>
          <strong>{list.listName}</strong>
          <button style={editHidden} className="button-small" onClick={() => setShowRename(true)}>edit</button>
        
        
          <div className="list-name-change" style={editShown}>
            <form onSubmit={(e) => handleListNameChange(list, e)}>
              <input name="listNameInput"  />
              <button type="submit">change name</button>
            </form>
            <button className="button-small" onClick={() => handleDeleteList(list)}>delete list</button>
            <button className="button-small" onClick={() => setShowRename(false)}>cancel</button>
          </div>
        </div>
        { list.books && list.books.length > 0
          ? <ul className="book-list">
              {list.books.map(b => {
                const authors = b.authors.join(', ')
                return( 
                  <li key={b.bookKey}>{b.title} by {authors} <button className="button-small" onClick={(e) => handleBookDelete(b,e)}>x</button></li>
              )}
            )}
            </ul>
          : null
        }
      </div>
    )  
  
  } 

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createList(
      {
        listName: event.target.listName.value,
        books: [],
      },
      currentUser
    ))
    event.target.listName.value = ''
  }

  if (currentUser === null) {
    return ( <NeedLogin /> )
  }
  return (
    <div id="lists">
      <h2>Lists</h2>
      <form onSubmit={handleSubmit}>
        <input name="listName" />
        <button type="submit">add list</button>
      </form>
      {myLists.map(l => {
        return (
          <DisplayList key={l.id} list={l} />
        )
      })}
    </div>
  )
}

export default Lists