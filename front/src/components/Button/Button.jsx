import {useState} from 'react'

import config from '../../config.json'
import './Button.scss'

const Button = ({label, icon, action, disabled, style}) => {

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      id='buttonContainer'
      className={disabled ? '' : 'anim a b'}
      onClick={disabled ? null : action}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        backgroundColor: disabled ? 'grey' : config.colors.primary,
        cursor: disabled ? 'initial' : 'pointer',
        color: disabled ? 'lightgrey' : config.colors.light,
        borderColor: disabled ? 'grey' :
          isHover ? config.light : config.colors.primary,
        borderRadius: config.borderRadius,
        ...style
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {icon && <div style={{marginRight: label ? 7 : 0}}>{icon}</div>}
        {label && <div>{label.toUpperCase()}</div>}
      </div>
    </div>
  )
}

export default Button