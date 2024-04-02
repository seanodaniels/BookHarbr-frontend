import { useState } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        { props.size && props.size === 'small'
          ? <button className="button-small" onClick={toggleVisibility}>{props.buttonLabel}</button>
          : <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        }
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Toggle