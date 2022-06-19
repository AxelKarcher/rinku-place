import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {useNavigate} from 'react-router-dom'

import './NotFoundPage.scss'
import Button from '../../components/Button/Button'
import config from '../../config.json'

const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <div id='notFoundPageContainer'>
      <div>
        <div style={{marginBottom: 5, color: config.colors.light}}>404</div>
        <Button
          action={() => navigate('/')}
          icon={<KeyboardBackspaceIcon />}
        />
      </div>
    </div>
  )
}

export default NotFoundPage