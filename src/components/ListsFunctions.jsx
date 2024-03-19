import { useSelector } from 'react-redux'

const ListsFunctions = ({ handleListAdd }) => {
  const allLists = useSelector(s => s.lists)
  return (
    <div className="lists-functions">
      <form onSubmit={handleListAdd}>
        { allLists.map(l => {
            return (
              <div key={l.id}>
                <input type="radio" name="selectedList" value={l.id} />{l.listName}
              </div>
            )
          })       
         }
        <button type="submit">add to list</button>
      </form>
    </div>
  )
}

export default ListsFunctions