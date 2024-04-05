import { useSelector } from 'react-redux'

const ListsFunctions = ({ selectedBooks, handleListAdd, handleListCancel }) => {
  const allLists = useSelector(s => s.lists)
  return (
    <div className="lists-functions form-popup" id="myForm">
      <div className="popup-content">
        { selectedBooks && selectedBooks[0] && selectedBooks[0].title 
          ? <h2>Choose a list for {selectedBooks[0].title}:</h2>
          : null
        }
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
          <button onClick={handleListCancel}>cancel</button>
        </form>
        
      </div>
    </div>
  )
}

export default ListsFunctions