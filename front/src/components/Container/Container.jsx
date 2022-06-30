import './Container.scss'

const Container = ({children, style}) => {
  return (
    <div id='container' style={{...style}}>{children}</div>
  )
}

export default Container