import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NeedLogin from './NeedLogin'
import { createList, updateLists } from '../reducers/listsReducer'
import { createNotification, createError } from '../reducers/alertReducer'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()

  const DisplayList = ({ list }) => {
    const [listName, setListName] = useState(list.listName)

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

    return (
      <div className="listItem">
        <h3>{list.listName}</h3>
        <div className="list-name-change">
          <form onSubmit={(e) => handleListNameChange(list, e)}>
            <input name="listNameInput"  />
            <button type="submit">change</button>
          </form>
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