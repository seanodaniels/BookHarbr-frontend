import { Link } from 'react-router-dom'

const SearchResults = ({ results, numRecords, terms, currentPage, handlePageUp, handlePageDown }) => {
  const hardLimit = 10
  let totalPages = Math.floor(numRecords/10)
  numRecords % hardLimit !== 0 ? totalPages += 1 : null

  const findItemUrl = (item) => {
    
    console.log('editions', item.editions)
    console.log('numfound', item.numFound)
    if (Number(item.editions.numFound) > 0) {
      return item.editions.docs[0].key
    } else{
      return item.key ? item.key : null
    }
  }

  return (
    <div className="search-results">
      <h2>Your search for '{terms}'</h2>
      <p>{numRecords} records found.</p>
      <p>page {currentPage} of {totalPages}</p>
      <ul id="search-results">
        { results ? results.docs.map(r => {
            let itemUrl = findItemUrl(r)
            // if (r.editions.docs[0].key) {
            //    itemUrl = r.editions.docs[0].key
            // }
            return (
              <li key={r.key}><Link to={`/book-detail${itemUrl}`}>{r.title}</Link> by {r.author_name}.</li>
            )
          }) : null }
            <button className="previous" onClick={handlePageDown}>previous</button>
            <button className="next" onClick={handlePageUp}>next</button>
      </ul>
    </div>
  )
}

export default SearchResults
