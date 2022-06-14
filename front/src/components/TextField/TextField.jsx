import OldTextField from '@mui/material/TextField'

import config from '../../config.json'

const TextField = ({value, setter, style, fullWidth, action}) => {
  return (
    <OldTextField
      fullWidth={fullWidth}
      autoComplete='off'
      style={{...style}}
      value={value}
      onChange={(e) => setter(e.target.value)}
      onKeyPress={(e) => value !== '' && e.key === 'Enter' && action}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: config.colors.primary,
          },
          '&:hover fieldset': {
            borderColor: config.colors.text,
          },
          '&.Mui-focused fieldset': {
            borderColor: config.colors.text,
          },
        },
        input: {color: config.colors.text}
      }}
    />
  )
}

export default TextField