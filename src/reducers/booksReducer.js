import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import booksService from '../services/books'

const booksSlice = createSlice({
  name: 'Books',
  initialState: [],
  reducers: {
    setBooks(state, action) {
      return action.payload
    }
  }
})

export const {
  setBooks
} = booksSlice.actions

export const initializeBooks = () => {
  return async dispatch => {
    const allTheBooks = await booksService.getAll()
    dispatch(setBooks(allTheBooks))
  }
}

export default booksSlice.reducer