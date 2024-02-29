import axios from 'axios'

const baseUrl = 'https://openlibrary.org/search.json'
const hardLimit = 'limit=10'


const generalSearch = async (searchObject) => {
  const searchString = searchObject.searchTerms
  const searchType = searchObject.searchType

  const response = await axios.get(`${baseUrl}?q=${searchString}&${hardLimit}`)
  return response.data
}

const olGeneralSearch = async (olParameterString) => {
  const response = await axios.get(`${baseUrl}?${olParameterString}&${hardLimit}`)
  return response.data
}

export default {
  generalSearch,
  olGeneralSearch
}