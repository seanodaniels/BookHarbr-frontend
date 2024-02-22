import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './reducers/booksReducer'
import listsReducer from './reducers/listsReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    books: booksReducer,
    lists: listsReducer,
    users: usersReducer,
    user: userReducer,
  },
})

// console.log('STORE:', store.getState())

export default store