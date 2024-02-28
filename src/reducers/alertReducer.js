import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return [{
        message: content,
        type: 'NOTIFICATION',
      }]
    },
    setError(state, action) {
      const content = action.payload
      return [{
        message: content,
        type: 'ERROR',
      }]
    },
    clearAlert(state, action) {
      return [{
        message: null,
        type: 'CLEAR',
      }]
    }
  }
})

export const {
  setNotification,
  setError,
  clearAlert
} = alertSlice.actions

export const createNotification = (content, timeOut = 5000) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearAlert())
    }, timeOut)
  }
}

export const createError = (content, timeOut = 5000) => {
  return async dispatch => {
    dispatch(setError(content))
    setTimeout(() => {
      dispatch(clearAlert())
    }, timeOut)
  }
}

export default alertSlice.reducer