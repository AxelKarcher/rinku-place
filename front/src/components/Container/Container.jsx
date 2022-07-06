import Header from '../Header/Header'

const Container = ({children, headerOnPage, ...style}) => {
  return (
    <div style={{height: '100vh'}}>
      {headerOnPage && <Header />}
      <div style={{display: 'flex', justifyContent: 'center',
        flexDirection: 'column', alignItems: 'center', ...style}}
      >
        {children}
      </div>
    </div>
  )
}

export default Container