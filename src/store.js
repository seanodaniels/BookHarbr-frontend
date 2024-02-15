import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './reducers/booksReducer'

const store = configureStore({
  reducer: {
    books: booksReducer
  },
})

console.log('STORE:', store.getState())

export default store