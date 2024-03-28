import { useSelector, useDispatch } from 'react-redux'
import NeedLogin from './NeedLogin'
import { createList } from '../reducers/listsReducer'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()


  const DisplayList = ({ list }) => {
    // console.log('test', list.books)
    return (
      <div className="listItem">
        <h3>{list.listName}</h3>
        { list.books && list.books.length > 0
          ? <ul className="book-list">
              {list.books.map(b => {
                const authors = b.authors.join(', ')
                return( 
                  <li key={b.bookKey}>{b.title} by {authors}</li>
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
          // <li key={l.id}>{l.listName}</li>
        )
      })}
    </div>
  )
}

export default Lists