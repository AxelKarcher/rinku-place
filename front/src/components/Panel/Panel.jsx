import config from '../../config.js'

import './Panel.scss'

const Panel = ({children, style}) => {
  return (
    <div
      id='panelContainer'
      style={{backgroundColor: config.colors.light, padding: config.padding,
        borderRadius: config.borderRadius, ...style}}
    >
      {children}
    </div>
  )
}

export default Panel