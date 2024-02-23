import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import listsService from '../services/lists'

const listsSlice = createSlice({
  name: 'Lists',
  initialState: [],
  reducers: {
    setLists(state, action) {
      return action.payload
    }
  }
})

export const {
  setLists
} = listsSlice.actions

export const initializeLists = () => {
  return async dispatch => {
    const allTheLists = await listsService.getAll()
    dispatch(setLists(allTheLists))
  }
}

export const setUserLists = (currentUser) => {
  return async dispatch => {
    const allUserLists = await listsService
      .getUserLists(currentUser.id)
    dispatch(setLists(allUserLists))
  }
}

export default listsSlice.reducer