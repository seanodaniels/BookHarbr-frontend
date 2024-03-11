import { Link } from 'react-router-dom'

const SearchResults = ({ results, numRecords, terms, currentPage, handlePageUp, handlePageDown }) => {
  const hardLimit = 10
  let totalPages = Math.floor(numRecords/10)
  numRecords % hardLimit !== 0 ? totalPages += 1 : null

  // const findItemId = (item) => {
    
  //   console.log('editions', item.editions)
  //   console.log('numfound', item.numFound)
  //   if (Number(item.editions.numFound) > 0) {
  //     return item.editions.docs[0].key
  //   } else{
  //     return item.key ? item.key : null
  //   }
  // }

  return (
    <div className="search-results">
      <h2>Your search for '{terms}'</h2>
      <p>{numRecords} records found.</p>
      <p>page {currentPage} of {totalPages}</p>
      <ul id="search-results">
        { results ? results.docs.map(r => {
           // let itemIdentifier = findItemId(r)
            // if (r.editions.docs[0].key) {
            //    itemUrl = r.editions.docs[0].key
            // }

            const authorList = r.author_name.map(a => a).toString().replace(",", ", ")
            
            return (
              <li key={r.key}>
                <Link to={`https://www.openlibrary.org${r.key}`}>{r.title}</Link> 
                <span className="author"> by {authorList}</span>
              </li>
            )
          }) : null }
            <button className="previous" onClick={handlePageDown}>previous</button>
            <button className="next" onClick={handlePageUp}>next</button>
      </ul>
    </div>
  )
}

export default SearchResults
