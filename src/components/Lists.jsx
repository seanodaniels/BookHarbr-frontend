import { useSelector } from 'react-redux'
import NeedLogin from './NeedLogin'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)

  if (currentUser === null) {
    return ( <NeedLogin /> )
  }
  return (
    <div id="lists">
      <h2>Lists</h2>
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