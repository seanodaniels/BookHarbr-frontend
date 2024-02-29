const SearchResults = ({ results, numRecords, terms, currentPage, handlePageUp, handlePageDown }) => {
  const hardLimit = 10
  let totalPages = Math.floor(numRecords/10)
  numRecords % hardLimit !== 0 ? totalPages += 1 : null

  return (
    <ul id="search-results">
      <h2>Your search for '{terms}'</h2>
      <p>{numRecords} records found.</p>
      <p>page {currentPage} of {totalPages}</p>
      { results ? results.map(r => {
          return (
            <li key={r.key}>{r.title} by {r.author_name}</li>
          )
        }) : null }
          <button onClick={handlePageDown}>previous</button>
          <button onClick={handlePageUp}>next</button>
    </ul>
  )
}

export default SearchResults
