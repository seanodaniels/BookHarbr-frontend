import axios from 'axios'
import siteConfig from '../siteConfig'

const baseUrl = 'https://openlibrary.org/search.json'


const generalSearch = async (searchObject) => {
  const searchString = searchObject.searchTerms
  const searchType = searchObject.searchType

  const response = await axios.get(`${baseUrl}?q=${searchString}&${siteConfig.searchLimit}`)
  return response.data
}

const olGeneralSearch = async (olParameterString) => {
  const response = await axios.get(`${baseUrl}?${olParameterString}&${siteConfig.searchLimit}`)
  return response.data
}

export default {
  generalSearch,
  olGeneralSearch
}