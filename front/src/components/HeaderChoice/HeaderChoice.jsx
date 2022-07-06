import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import {colors} from '../../config'

const HeaderChoice = ({label, route}) => {

  const navigate = useNavigate()

  const [isIt, setIsIt] = useState(false)

  useEffect(() => {
    const routeToTest = route.substring(1)
    const path = window.location.pathname.substring(1)

    setIsIt(path.indexOf(routeToTest) !== -1)
  }, [window.location])

  return (
    <div
      style={{display: 'flex', alignItems: 'center', paddingRight: 25}}
      onClick={() => navigate(route)}
    >
      <span style={{width: 25, color: colors.primary}}>{isIt && <DoubleArrowIcon />}</span>
      <span style={{marginLeft: 5, cursor: 'pointer'}}>{label}</span>
    </div>
  )
}

export default HeaderChoice