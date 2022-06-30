import {CircularProgress} from '@mui/material'

import config from '../../config.js'

const Spinner = ({left}) => {
  return (
    <div style={{display: 'flex', justifyContent: left ? 'flex-start' : 'center'}}>
      <CircularProgress sx={{color: config.colors.primary}} />
    </div>
  )
}

export default Spinner