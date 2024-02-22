import axios from 'axios'
const baseUrl = '/api/books'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export default {
  getAll,
  setToken
}