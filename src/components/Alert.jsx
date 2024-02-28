import { useSelector } from 'react-redux'

const Alert = () => {
  const alert = useSelector(state => state.alert[0])

  let alertCSS = ''

  switch (alert.type) {
    case 'NOTIFICATION':
      alertCSS = 'alert-notification'
      break
    case 'ERROR':
      alertCSS = 'alert-error'
      break
    case 'CLEAR':
      alertCSS = 'alert-ready'
      break
    default:
      alertCSS = 'alert-notification'
      break
  }

  return (
    <div id="alert" className={alertCSS}>
      {alert.message}
    </div>
  )
}

export default Alert

