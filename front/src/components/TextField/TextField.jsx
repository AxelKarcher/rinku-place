import OldTextField from '@mui/material/TextField'

import config from '../../config.json'

const TextField = ({value, style, fullWidth, action,
  label, disabled, isOptional}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {
        label &&
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <div style={{fontSize: 20}}>{label}</div>
          {
            isOptional &&
            <div style={{fontSize: 11, marginLeft: 5, color: 'grey', paddingBottom: 2}}>
              (Optionnel)
            </div>}
        </div>
      }
      <OldTextField
        disabled={disabled}
        fullWidth={fullWidth}
        autoComplete='off'
        style={{...style}}
        value={value}
        onChange={(e) => action(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: !disabled && config.colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: config.colors.primary
            }
          }
        }}
      />
    </div>
  )
}

export default TextField