import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NeedLogin from './NeedLogin'
import { createList, updateLists, deleteList } from '../reducers/listsReducer'
import { createNotification, createError } from '../reducers/alertReducer'
import BookListDisplay from './BookListDisplay'
import Toggle from './Toggle'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  const myLists = useSelector(state => state.lists)
  const dispatch = useDispatch()


  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createList(
      {
        listName: event.target.listName.value,
        books: [],
      },
      currentUser
    ))
    event.target.listName.value = ''
  }

  if (currentUser === null) {
    return ( <NeedLogin /> )
  }
  return (
    <div id="lists">
        <h2>Lists</h2>
        <Toggle buttonLabel="New List" size="small">
        <form onSubmit={handleSubmit}>
          <input name="listName" />
          <button type="submit">add new list</button>
        </form> 
        </Toggle>
        <div className="page-contents">
          {myLists.map(l => {
            return (
              <BookListDisplay key={l.id} list={l} />
            )
          })}
        </div>
    </div>
  )
}

export default Lists