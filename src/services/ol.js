import axios from 'axios'
import siteConfig from '../siteConfig'

const generalSearchUrl = 'https://openlibrary.org/search.json'
const baseUrl = 'https://openlibrary.org'
const authorSearchUrl = 'https://openlibrary.org'


const generalSearch = async (searchObject) => {
  const searchString = searchObject.searchTerms
  const searchType = searchObject.searchType

  const response = await axios.get(`${generalSearchUrl}?q=${searchString}&${siteConfig.searchLimit}&fields=editions`)
  return response.data
}

const olGeneralSearch = async (olParameterString) => {
  console.log('test:', olParameterString)
  const response = await axios.get(`${generalSearchUrl}?${olParameterString}&limit=${siteConfig.searchLimit}&fields=key,title,author_name,cover_i,first_publish_year`)
  return response.data
}

const olWorksSearch = async (type, itemKey) => {
  try {
    const response = await axios.get(`${baseUrl}/${type}/${itemKey}.json`)
    return response.data
  } catch (error) {
    console.log('Error!', error.message)
  }
}

const olAuthorSearch = async (authorKey) => {
  const response = await axios.get(`${authorSearchUrl}${authorKey}.json`)
  return response.data
}

export default {
  generalSearch,
  olGeneralSearch,
  olAuthorSearch,
  olWorksSearch
}

