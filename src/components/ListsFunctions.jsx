import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ListsFunctions = ({ handleListAdd }) => {
  const dispatch = useDispatch()

  return (
    <div className="lists-functions">
      <form onSubmit={handleListAdd}>
      <button type="submit">button</button>
      </form>
    </div>
  )
}

export default ListsFunctions