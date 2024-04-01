import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import listsService from '../services/lists'
import { userSet } from '../reducers/userReducer'

const listsSlice = createSlice({
  name: 'Lists',
  initialState: [],
  reducers: {
    setLists(state, action) {
      return action.payload
    },
    appendLists(state, action) {
      state.push(action.payload)
    },
    changeList(state, action) {
      const changedList = action.payload
      return state.map(s => s.id === changedList.id ? changedList : s)
    },
    removeList(state, action) {
      const id = action.payload
      return state.filter(s => s.id !== id)
    }
  }
})

export const {
  setLists,
  appendLists,
  changeList,
  removeList
} = listsSlice.actions

export const initializeLists = () => {
  return async dispatch => {
    const allTheLists = await listsService.getAll()
    dispatch(setLists(allTheLists))
  }
}

export const setUserLists = () => {
  return async dispatch => {
    try {
      const currentUserLists = await listsService.getUserLists()
      dispatch(setLists(currentUserLists))
    } catch (e) {
      window.localStorage.removeItem('loggedInBookHarbrUser')
      dispatch(userSet(null))
    }
  }
}

export const createList = (listObject, currentUser) => {
  return async dispatch => {
    const newList = await listsService.newUserList(listObject)
    const newListWithUser = {
      ...newList,
      user: currentUser
    }
    dispatch(appendLists(newListWithUser))
  }
}

export const updateLists = (listObject, currentUser) => {
  return async dispatch => {
    const id = listObject.id
    const updatedList = await listsService.update(id, listObject)
    const updatedListWithUser = {
      ...updatedList,
      user: currentUser
    }
    dispatch(changeList(updatedListWithUser))
  }
}

export const deleteList = (id) => {
  return async dispatch => {
    await listsService.deleteList(id)
    dispatch(removeList(id))
  }
}

export default listsSlice.reducer