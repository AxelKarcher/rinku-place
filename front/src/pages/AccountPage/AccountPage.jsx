import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Panel from '../../components/Panel/Panel'
import Container from '../../components/Container/Container'
import Button from '../../components/Button/Button'

const AccountPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('token'))) {navigate('/auth')}
  }, [])

  const handleDisconnect = () => {
    localStorage.setItem('token', null)
    navigate('/auth')
  }

  return (
    <Container headerOnPage>
      <Panel>
        <Button label='Déconnexion' action={() => handleDisconnect()} />
      </Panel>
    </Container>
  )
}

export default AccountPage