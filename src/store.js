import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './reducers/booksReducer'
import listsReducer from './reducers/listsReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import alertReducer from './reducers/alertReducer'

const store = configureStore({
  reducer: {
    books: booksReducer,
    lists: listsReducer,
    users: usersReducer,
    user: userReducer,
    alert: alertReducer,
  },
})

// console.log('STORE:', store.getState())

export default store