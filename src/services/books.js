import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/books'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('request', request)
  return request.then((response) => response.data)
}

export default {
  getAll,
  setToken
}