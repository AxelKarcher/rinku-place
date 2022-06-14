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
        backgroundColor: disabled ? 'lightgray' : config.colors.primary,
        cursor: disabled ? 'initial' : 'pointer',
        color: disabled ? 'grey' : config.colors.text,
        paddingLeft: icon ? 8 : 12,
        borderColor: disabled ? config.colors.text :
          isHover ? '#d3d3d3' : config.colors.primary,
        ...style
      }}
    >
      {
        icon &&
        <span style={{marginRight: 10}}>{icon}</span>
      }
      {
        label &&
        <span>{label.toUpperCase()}</span>
      }
    </div>
  )
}

export default Button