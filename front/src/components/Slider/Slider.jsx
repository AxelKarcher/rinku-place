import {Slider as OldSlider} from '@mui/material'

import config from '../../config.json'

const Slider = ({value, action, disabled, label, max, min, step}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{fontSize: 20, marginBottom: 10}}>{label}</div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <OldSlider
          style={{width: '90%'}}
          sx={{
            color: config.colors.primary,
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: disabled ? 'grey' : config.colors.primary,
              borderWidth: 3,
              borderStyle: 'solid',
              borderColor: config.colors.light,
              boxShadow: 0
            }
          }}
          value={value}
          onChange={(e) => action(e.target.value)}
          disabled={disabled}
          valueLabelDisplay='auto'
          marks
          max={max}
          min={min}
          step={step}
        />
      </div>
    </div>
  )
}

export default Slider