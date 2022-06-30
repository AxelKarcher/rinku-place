import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {useNavigate} from 'react-router-dom'

import Button from '../../components/Button/Button'
import config from '../../config.js'
import Container from '../../components/Container/Container'

const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <Container
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
    >
      <div>
        <div style={{marginBottom: 5, color: config.colors.light, fontSize: 60, fontWeight: 'bold'}}>404</div>
        <Button
          action={() => navigate('/')}
          icon={<KeyboardBackspaceIcon />}
        />
      </div>
    </Container>
  )
}

export default NotFoundPage