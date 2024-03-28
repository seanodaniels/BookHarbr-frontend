import { useSelector, useDispatch } from 'react-redux'
import NeedLogin from './NeedLogin'
import { createList, updateLists } from '../reducers/listsReducer'
import { createNotification, createError } from '../reducers/alertReducer'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()

  const DisplayList = ({ list }) => {

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
  
    return (
      <div className="listItem">
        <h3>{list.listName}</h3>
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