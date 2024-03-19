import { useSelector, useDispatch } from 'react-redux'
import NeedLogin from './NeedLogin'
import { createList } from '../reducers/listsReducer'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()

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
      <ul className="my-lists">
      {myLists.map(l => {
        return (
          <li key={l.id}>{l.listName}</li>
        )
      })}
      </ul>
    </div>
  )
}

export default Lists