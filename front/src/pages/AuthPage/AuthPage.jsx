import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Container from '../../components/Container/Container'
import Panel from '../../components/Panel/Panel'
import Title from '../../components/Title/Title'
import TextField from '../../components/TextField/TextField'
import {colors, marginVertical, titleMarginBottom} from '../../config.js'
import Button from '../../components/Button/Button'
import Spinner from '../../components/Spinner/Spinner'
import users from '../../api/users'
import useApi from '../../hooks/useApi'
import {setToken} from '../../redux/tokenSlice'

const AuthPage = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [infos, setInfos] = useState({pseudo: '', mail: '', password: ''})
  const [isTryError, setIsTryError] = useState(false)

  const {data, isLoading, request, isError} = useApi(users.users)

  useEffect(() => {
    if (data?.token) {
      dispatch(setToken(data.token))
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
    <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{color: colors.light, fontSize: 50, fontWeight: 'bold',
        marginBottom: titleMarginBottom}}
      >
        rinku-place
      </div>
      <Panel>
        <Title style={{marginBottom: titleMarginBottom}} label='Authentification' />
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