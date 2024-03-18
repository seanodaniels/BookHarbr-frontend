import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const SearchResults = ({ results, numRecords, terms, currentPage, handlePageUp, handlePageDown, handleSelected }) => {
  const hardLimit = 10
  let totalPages = Math.floor(numRecords/10)
  numRecords % hardLimit !== 0 ? totalPages += 1 : null

  return (
    <div className="search-results">
      <h2>Your search for '{terms}'</h2>
      <p>{numRecords} records found.</p>
      <p>page {currentPage} of {totalPages}</p>
      <ul id="search-results">
        { results ? results.docs.map(r => {

            const authorList = r.author_name 
              ? r.author_name.map(a => a).toString().replace(",", ", ")
              : null
            
            return (
              // <SearchItem key={r.key} bookKey={r.key} title={r.title} authors={authorList} />
              <li key={r.key}>
                <input type="checkbox" onChange={() => { 
                  handleSelected(r.key, r.title, authorList)                  
                }} />
                <Link to={`${r.key}`}>{r.title}</Link>
                {
                  authorList 
                    ? <span className="author"> by {authorList}</span>
                    : null
                }          
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
