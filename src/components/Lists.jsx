import { useSelector } from 'react-redux'
import NeedLogin from './NeedLogin'

const Lists = () => {
  const currentUser = useSelector(state => state.user)  
  // need to call lists for current user only
  // const lists = useSelector(state => state.lists)


  if (currentUser === null) {
    return ( <NeedLogin /> )
  }
  return (
    <div id="lists">
      <h2>Lists</h2>
    </div>
  )
}

export default Lists