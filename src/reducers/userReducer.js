import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload
    }
  }
})

export const { userSet } = userSlice.actions

export default userSlice.reducer