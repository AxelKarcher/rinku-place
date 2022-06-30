import config from '../../config.js'

const Title = ({label, style}) => {
  return (
    <div style={{fontWeight: 'bold', fontSize: 50, color: config.colors.primary, ...style}}>
      {label}
    </div>
  )
}

export default Title