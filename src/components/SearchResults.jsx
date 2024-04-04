import { Link } from 'react-router-dom'

const SearchResults = ({ results, numRecords, terms, currentPage, handlePageUp, handlePageDown, handleSelected }) => {
  const hardLimit = 10
  let totalPages = Math.floor(numRecords/10)
  numRecords % hardLimit !== 0 ? totalPages += 1 : null

  return (
    <div className="search-results">
      <h3>Your search for '{terms}'</h3>
      <span>{numRecords} records found.</span>
      <p className="page-location">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></p>
      <table id="search-results" className="data-display-01">
        <tbody>
          { results ? results.docs.map(r => {

              const authorList = r.author_name 
                ? r.author_name.map(a => a).toString().replace(",", ", ")
                : null
              
              return (
                // <SearchItem key={r.key} bookKey={r.key} title={r.title} authors={authorList} />
                <tr key={r.key}>
                  <td className="book-info">
                    <span className="book-title"><Link to={`${r.key}`}>{r.title}</Link></span>
                    {
                      authorList 
                        ? <span className="author"> by <span className="book-authors">{authorList}</span></span>
                        : null
                    }          
                  </td>
                  <td className="book-controls">
                    <button className="open-button button-small" onClick={() => { 
                        handleSelected(r.key, r.title, authorList)                  
                      }}>+list</button>
                  </td>
                </tr>      
              )
            }) : null }
        </tbody>
      </table>
      <button className="previous" onClick={handlePageDown}>previous</button>
      <button className="next" onClick={handlePageUp}>next</button>
    </div>
  )
}

export default SearchResults
