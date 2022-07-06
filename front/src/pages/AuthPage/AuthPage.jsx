import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Container from '../../components/Container/Container'
import Panel from '../../components/Panel/Panel'
import Title from '../../components/Title/Title'
import TextField from '../../components/TextField/TextField'
import {colors, marginVertical, titleVertMargin} from '../../config.js'
import Button from '../../components/Button/Button'
import Spinner from '../../components/Spinner/Spinner'
import users from '../../api/users'
import useApi from '../../hooks/useApi'

const AuthPage = () => {

  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [infos, setInfos] = useState({pseudo: '', mail: '', password: ''})
  const [isTryError, setIsTryError] = useState(false)

  const {data, isLoading, request, isError} = useApi(users.users)

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem('token', JSON.stringify(data.token))
      navigate('/arrays')
    }
  }, [data])

  useEffect(() => {setIsTryError(false)}, [isRegister])

  useEffect(() => {if (isError) {setIsTryError(true)}}, [isError])

  const handleTry = () => {
    if (infos.pseudo === '' || infos.password === '' ||
    (isRegister && infos.mail === '')) {
      setIsTryError(true)
    } else {
      request(isRegister ? 'register' : 'login', infos)
    }
  }

  const handleInfos = (type, data) => {
    let newInfos = {...infos}

    newInfos[type] = data
    setInfos(newInfos)
  }

  return (
    <Container>
      <div style={{color: colors.light, fontSize: 50, fontWeight: 'bold',
        marginBottom: titleVertMargin, marginTop: titleVertMargin}}
      >
        rinku-place
      </div>
      <Panel>
        <Title label='Authentification' />
        <TextField
          disabled={isLoading}
          style={{marginBottom: marginVertical}}
          label='Pseudo'
          value={infos.pseudo}
          action={(e) => handleInfos('pseudo', e)}
          handleConfirm={() => handleTry()}
        />
        {
          isRegister &&
          <TextField
            disabled={isLoading}
            style={{marginBottom: marginVertical}}
            label='Mail'
            value={infos.mail}
            action={(e) => handleInfos('mail', e)}
            handleConfirm={() => handleTry()}
          />
        }
        <TextField
          password
          disabled={isLoading}
          style={{marginBottom: marginVertical}}
          label='Mot de passe'
          value={infos.password}
          action={(e) => handleInfos('password', e)}
          handleConfirm={() => handleTry()}
        />
        {
          isLoading
          ?
          <Spinner />
          :
          <>
            <Button
              style={{marginBottom: marginVertical}}
              label={isTryError ? 'Non, réessaie' : isRegister ? 'Inscription' : 'Connexion'}
              action={() => handleTry()}
            />
            <Button
              label={isRegister ? 'Déjà un compte ?' : 'Pas de compte ?'}
              action={() => setIsRegister(!isRegister)}
            />
          </>
        }
      </Panel>
    </Container>
  )
}

export default AuthPage