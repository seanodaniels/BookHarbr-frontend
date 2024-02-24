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

export const setUserLists = () => {
  return async dispatch => {
    const currentUserLists = await listsService.getUserLists()
    dispatch(setLists(currentUserLists))

  }
}

export default listsSlice.reducer