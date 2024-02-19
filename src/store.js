import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './reducers/booksReducer'
import listsReducer from './reducers/listsReducer'

const store = configureStore({
  reducer: {
    books: booksReducer,
    lists: listsReducer
  },
})

console.log('STORE:', store.getState())

export default store