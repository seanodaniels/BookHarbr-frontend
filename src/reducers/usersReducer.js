import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'Users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const {
  setUsers
} = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const allTheUsers = await usersService.getAll()
    dispatch(setUsers(allTheUsers))
  }
}

export default usersSlice.reducer