import { useSelector } from 'react-redux'

const Lists = () => {
  const lists = useSelector(state => state.lists)
  return (
    <div id="lists">
      <h2>Lists</h2>
      {lists.map(l => {
        return (
          <li key="{l.id}">{l.listName}</li>
      )
        }
      )}
    </div>
  )
}

export default Lists