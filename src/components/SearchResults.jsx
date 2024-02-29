const SearchResults = ({ results, numRecords }) => {
  return (
    <ul id="search-results">
      <h2>{numRecords} records found.</h2>
      { results ? results.map(r => {
          return (
            <li key={r.key}>{r.title} by {r.author_name}</li>
          )
        }) : null }
    </ul>
  )
}

export default SearchResults
