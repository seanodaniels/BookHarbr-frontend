import axios from 'axios'
const baseUrl = 'https://openlibrary.org/search.json'
const limit = 'limit=10'

const generalSearch = async (searchObject) => {
  const searchString = searchObject.searchTerms
  const searchType = searchObject.searchType

  const response = await axios.get(`${baseUrl}?q=${searchString}&${limit}`)
  return response.data
}

export default {
  generalSearch
}