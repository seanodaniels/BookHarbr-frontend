import axios from 'axios'
import siteConfig from '../siteConfig'

const baseUrl = 'https://openlibrary.org/search.json'


const generalSearch = async (searchObject) => {
  const searchString = searchObject.searchTerms
  const searchType = searchObject.searchType

  const response = await axios.get(`${baseUrl}?q=${searchString}&${siteConfig.searchLimit}&fields=editions`)
  return response.data
}

const olGeneralSearch = async (olParameterString) => {
  const response = await axios.get(`${baseUrl}?${olParameterString}&limit=${siteConfig.searchLimit}&fields=key,title,author_name,editions`)
  return response.data
}

const olWorksSearch = async (olParameterString) => {
  const response = await axios.get(`${baseUrl}?${olParameterString}&limit=${siteConfig.searchLimit}&fields=key,title,author_name,editions`)
  return response.data
}

const olBooksSearch = async (olParameterString) => {
  const response = await axios.get(`${baseUrl}?${olParameterString}&limit=${siteConfig.searchLimit}&fields=key,title,author_name,editions`)
  return response.data
}


export default {
  generalSearch,
  olGeneralSearch,
  olBooksSearch,
  olWorksSearch
}