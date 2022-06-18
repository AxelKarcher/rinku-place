import {useState, useEffect} from 'react'
import {Select as OldSelect, MenuItem} from '@mui/material'

import Spinner from '../Spinner/Spinner'

const Select = ({fullWidth, label, value, type,
  action, disabled}) => {

  const mentionChoices = [
    {value: 'vg', label: 'Très bon'},
    {value: 'g', label: 'Bon'},
    {value: 'n', label: 'Neutre'},
    {value: 'b', label: 'Pas ouf'},
    {value: 'vb', label: 'Horrible'}
  ]

  const [choices, setChoices] = useState()

  useEffect(() => {
    switch (type) {
      case 'note':
        setChoices(mentionChoices)
        break
      default:
        break
    }
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {label && <div style={{fontSize: 20}}>{label}</div>}
      {
        choices === undefined
        ?
        <Spinner left />
        :
        <OldSelect
          disabled={disabled}
          fullWidth={fullWidth}
          value={value}
          onChange={(e) => action(e.target.value)}
        >
          {choices?.map((elem, i) => (
            <MenuItem key={i} value={elem.value}>{elem.label}</MenuItem>
          ))}
        </OldSelect>
      }
    </div>
  )
}

export default Select