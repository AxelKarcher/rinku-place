import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Container from '../../components/Container/Container'
import Panel from '../../components/Panel/Panel'
import Title from '../../components/Title/Title'
import TextField from '../../components/TextField/TextField'
import config from '../../config.json'
import Button from '../../components/Button/Button'
import useApi from '../../hooks/useApi'
import auth from '../../api/auth'
import Spinner from '../../components/Spinner/Spinner'

const AuthPage = () => {

  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [infos, setInfos] = useState({pseudo: '', mail: '', password: ''})
  const [missings, setMissings] = useState({pseudo: false, mail: false, password: false})

  const {data, loading, request} = useApi(auth.auth)

  const handleInfos = (type, data) => {
    let newInfos = {...infos}

    newInfos[type] = data
    setInfos(newInfos)
  }

  const checkMissings = () => {
    let newMissings = {...missings}

    if (isRegister) {
      newMissings.mail = (infos.mail === '' || !infos.mail.indexOf('@'))
    }
    newMissings.pseudo = infos.pseudo === ''
    newMissings.password = infos.password === ''
    setMissings(newMissings)
  }

  const handleTry = async () => {
    checkMissings()
    await request(isRegister ? 'register' : 'login', infos)
  }

  if (data !== undefined) {
    console.log(data)
  }

  return (
    <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{color: config.colors.light, fontSize: 50, fontWeight: 'bold',
        marginBottom: config.titleMarginBottom}}
      >
        rinku-place
      </div>
      <Panel>
        <Title style={{marginBottom: config.titleMarginBottom}} label='Authentification' />
        <TextField
          style={{marginBottom: config.marginBottom}}
          label='Pseudo'
          value={infos.pseudo}
          action={(e) => handleInfos('pseudo', e)}
        />
        {
          isRegister &&
          <TextField
            style={{marginBottom: config.marginBottom}}
            label='Mail'
            value={infos.mail}
            action={(e) => handleInfos('mail', e)}
          />
        }
        <TextField
          style={{marginBottom: config.marginBottom}}
          label='Mot de passe'
          value={infos.password}
          action={(e) => handleInfos('password', e)}
        />
        {
          loading
          ?
          <Spinner />
          :
          <>
            <Button
              style={{marginBottom: config.marginBottom}}
              label={isRegister ? 'Inscription' : 'Connexion'}
              action={() => handleTry()}
            />
            <Button
              label={isRegister ? 'Déjà un compte ?' : 'Pas de compte ?'}
              action={() => setIsRegister(!isRegister)}
            />
            {
              !isRegister &&
              <Button
                style={{marginTop: config.marginBottom}}
                label='Mot de passe oublié ?'
              />
            }
          </>
        }
      </Panel>
    </Container>
  )
}

export default AuthPage