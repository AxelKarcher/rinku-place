import config from '../../config.json'

const Panel = ({children, style}) => {
  return (
    <div style={{backgroundColor: config.colors.light, padding: config.padding,
      borderRadius: config.borderRadius, ...style}}
    >
      {children}
    </div>
  )
}

export default Panel