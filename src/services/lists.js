import axios from 'axios'
const baseUrl = '/api/lists'
const baseUserListsUrl = '/api/users/lists'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getUserLists = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUserListsUrl, config)
  return request.then(response => response.data)
}

const newUserList = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default {
  getAll,
  setToken,
  getUserLists,
  newUserList,
}